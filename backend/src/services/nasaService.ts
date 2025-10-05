import { NasaPowerResponse, NasaApiRequest, WeatherDataPoint, TimeResolution } from '@skyloom/shared';
import { NASA_API_CONFIG } from '@skyloom/shared';

export class NasaService {
  private cache: Map<string, { data: WeatherDataPoint[]; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

  /**
   * Fetches weather data from NASA POWER API
   */
  async fetchWeatherData(request: NasaApiRequest): Promise<WeatherDataPoint[]> {
    const cacheKey = this.generateCacheKey(request);
    
    // Check cache first
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      console.log('Returning cached NASA data');
      return cached.data;
    }

    try {
      const url = this.buildNasaApiUrl(request);
      console.log('Fetching from NASA API:', url);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`NASA API error: ${response.status} ${response.statusText}`);
      }

      const nasaData: NasaPowerResponse = await response.json();
      const weatherData = this.transformNasaData(nasaData, request.timeResolution);
      
      // Cache the result
      this.cache.set(cacheKey, {
        data: weatherData,
        timestamp: Date.now()
      });

      return weatherData;
    } catch (error) {
      console.error('Error fetching NASA data:', error);
      throw new Error(`Failed to fetch weather data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Builds NASA API URL based on request parameters
   */
  private buildNasaApiUrl(request: NasaApiRequest): string {
    const { latitude, longitude, startDate, endDate, parameters, timeResolution } = request;
    
    const baseUrl = NASA_API_CONFIG.BASE_URL;
    const community = NASA_API_CONFIG.COMMUNITIES.AG; // Default to Agriculture community
    
    // Map time resolution to NASA API endpoint
    const temporalEndpoint = this.getTemporalEndpoint(timeResolution);
    
    const params = new URLSearchParams({
      parameters: parameters.join(','),
      community,
      longitude: longitude.toString(),
      latitude: latitude.toString(),
      start: startDate,
      end: endDate,
      format: 'JSON'
    });

    return `${baseUrl}/temporal/${temporalEndpoint}/point?${params.toString()}`;
  }

  /**
   * Maps time resolution to NASA API temporal endpoint
   */
  private getTemporalEndpoint(resolution: TimeResolution): string {
    switch (resolution) {
      case 'hourly':
        return 'hourly';
      case 'daily':
        return 'daily';
      case 'monthly':
        return 'monthly';
      default:
        return 'daily';
    }
  }

  /**
   * Transforms NASA API response to our WeatherDataPoint format
   */
  private transformNasaData(nasaData: NasaPowerResponse, timeResolution: TimeResolution): WeatherDataPoint[] {
    const parameters = nasaData.properties.parameter;
    const weatherData: WeatherDataPoint[] = [];

    // Get all available dates from the first parameter
    const firstParam = Object.values(parameters)[0];
    if (!firstParam) {
      return weatherData;
    }

    const dates = Object.keys(firstParam);

    for (const date of dates) {
      const formattedDate = this.formatDateForResolution(date, timeResolution);
      
      const weatherPoint: WeatherDataPoint = {
        date: formattedDate,
        temperature: {
          avg: parameters.T2M?.[date] ?? 0,
          min: parameters.T2M_MIN?.[date] ?? 0,
          max: parameters.T2M_MAX?.[date] ?? 0,
        },
        humidity: {
          relative: parameters.RH2M?.[date] ?? 0,
          specific: parameters.QV2M?.[date] ?? 0,
        },
        wind: {
          speed: parameters.WS2M?.[date] ?? 0,
          direction: parameters.WD2M?.[date] ?? 0,
        },
        precipitation: parameters.PRECTOT?.[date] ?? 0,
        pressure: parameters.PS?.[date] ?? 0,
        solarRadiation: parameters.ALLSKY_SFC_SW_DWN?.[date] ?? 0,
      };

      weatherData.push(weatherPoint);
    }

    return weatherData.sort((a, b) => a.date.localeCompare(b.date));
  }

  /**
   * Formats date string based on time resolution
   */
  private formatDateForResolution(dateStr: string, resolution: TimeResolution): string {
    // NASA API returns dates in YYYYMMDD format for daily, YYYYMM for monthly, etc.
    if (resolution === 'monthly') {
      // Convert YYYYMM to YYYY-MM-01
      const year = dateStr.substring(0, 4);
      const month = dateStr.substring(4, 6);
      return `${year}-${month}-01`;
    } else if (resolution === 'daily') {
      // Convert YYYYMMDD to YYYY-MM-DD
      const year = dateStr.substring(0, 4);
      const month = dateStr.substring(4, 6);
      const day = dateStr.substring(6, 8);
      return `${year}-${month}-${day}`;
    } else {
      // For hourly, assume it's already in a good format or convert as needed
      return dateStr;
    }
  }

  /**
   * Generates cache key for request
   */
  private generateCacheKey(request: NasaApiRequest): string {
    return `${request.latitude},${request.longitude},${request.startDate},${request.endDate},${request.parameters.join(',')},${request.timeResolution}`;
  }

  /**
   * Clears the cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Gets cache statistics
   */
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}
