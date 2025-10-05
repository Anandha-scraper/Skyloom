import { 
  generateMockData, 
  filterWeatherDataByDateRange, 
  calculateWeatherSummary,
  MOCK_LOCATIONS,
  WeatherDataPoint,
  WeatherSummary,
  LocationData,
  NasaApiRequest,
  TimeResolution,
  NASA_API_CONFIG
} from '@climatesight/shared';
import { NasaService } from './nasaService.js';
import { RealWeatherService } from './realWeatherService.js';

export class WeatherService {
  private mockData: WeatherDataPoint[];
  private nasaService: NasaService;
  private realWeatherService: RealWeatherService;
  private useNasaApi: boolean;
  private useRealWeather: boolean;

  constructor(useNasaApi: boolean = true, useRealWeather: boolean = true) {
    // Generate mock data once on service initialization
    this.mockData = generateMockData(1990, 2030);
    this.nasaService = new NasaService();
    this.realWeatherService = new RealWeatherService();
    this.useNasaApi = useNasaApi;
    this.useRealWeather = useRealWeather;
  }

  async getWeatherData(
    location: string,
    startDate: string,
    endDate: string,
    timeResolution: TimeResolution = 'daily'
  ): Promise<WeatherDataPoint[]> {
    // Try real weather API first
    if (this.useRealWeather) {
      try {
        return await this.realWeatherService.getWeatherData(location, startDate, endDate);
      } catch (error) {
        console.error('Real weather API failed, trying NASA API:', error);
      }
    }

    // Fall back to NASA API
    if (this.useNasaApi) {
      try {
        // Find location coordinates
        const locationData = MOCK_LOCATIONS.find(loc => loc.name === location);
        if (!locationData) {
          throw new Error(`Location not found: ${location}`);
        }

        // Convert dates to NASA API format (YYYYMMDD)
        const startDateFormatted = this.formatDateForNasaApi(startDate);
        const endDateFormatted = this.formatDateForNasaApi(endDate);

        // Create NASA API request
        const nasaRequest: NasaApiRequest = {
          latitude: locationData.coordinates.latitude,
          longitude: locationData.coordinates.longitude,
          startDate: startDateFormatted,
          endDate: endDateFormatted,
          parameters: [
            NASA_API_CONFIG.PARAMETERS.TEMPERATURE_AVG,
            NASA_API_CONFIG.PARAMETERS.TEMPERATURE_MAX,
            NASA_API_CONFIG.PARAMETERS.TEMPERATURE_MIN,
            NASA_API_CONFIG.PARAMETERS.HUMIDITY_RELATIVE,
            NASA_API_CONFIG.PARAMETERS.HUMIDITY_SPECIFIC,
            NASA_API_CONFIG.PARAMETERS.WIND_SPEED,
            NASA_API_CONFIG.PARAMETERS.WIND_DIRECTION,
            NASA_API_CONFIG.PARAMETERS.PRECIPITATION,
            NASA_API_CONFIG.PARAMETERS.PRESSURE,
            NASA_API_CONFIG.PARAMETERS.SOLAR_RADIATION,
          ],
          timeResolution
        };

        return await this.nasaService.fetchWeatherData(nasaRequest);
      } catch (error) {
        console.error('NASA API failed, falling back to mock data:', error);
        // Fall back to mock data if NASA API fails
        return this.getMockWeatherData(location, startDate, endDate);
      }
    } else {
      return this.getMockWeatherData(location, startDate, endDate);
    }
  }

  private async getMockWeatherData(
    location: string,
    startDate: string,
    endDate: string
  ): Promise<WeatherDataPoint[]> {
    const filteredData = filterWeatherDataByDateRange(
      this.mockData,
      startDate,
      endDate
    );

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));

    return filteredData;
  }

  private formatDateForNasaApi(dateStr: string): string {
    // Convert YYYY-MM-DD to YYYYMMDD
    return dateStr.replace(/-/g, '');
  }

  async getWeatherSummary(
    location: string,
    startDate: string,
    endDate: string
  ): Promise<WeatherSummary> {
    const weatherData = await this.getWeatherData(location, startDate, endDate);
    return calculateWeatherSummary(weatherData);
  }

  async getLocations(): Promise<LocationData[]> {
    // In a real implementation, this would query a database
    // For now, return mock locations with their data
    
    const locations: LocationData[] = MOCK_LOCATIONS.map(location => ({
      name: location.name,
      coordinates: location.coordinates,
      data: this.mockData.slice(0, 30), // Return first 30 days as sample
    }));

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 50));

    return locations;
  }

  /**
   * Search locations by query string using mock data
   */
  async searchLocations(query: string): Promise<LocationData[]> {
    if (!query || query.trim().length < 2) {
      return [];
    }

    // Use mock data for location search
    const searchTerm = query.toLowerCase().trim();
    const filteredLocations = MOCK_LOCATIONS.filter(location =>
      location.name.toLowerCase().includes(searchTerm)
    );

    // Convert to LocationData format
    const locations: LocationData[] = filteredLocations.map(location => ({
      name: location.name,
      coordinates: location.coordinates,
      data: this.mockData.slice(0, 30), // Return first 30 days as sample
    }));

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));

    return locations.slice(0, 10); // Limit to 10 results
  }

  /**
   * Get nearby places by coordinates using mock data
   */
  async getNearbyPlaces(
    latitude: number,
    longitude: number,
    radius: number = 50000
  ): Promise<LocationData[]> {
    // Return mock locations (not very useful for nearby search)
    const locations: LocationData[] = MOCK_LOCATIONS.map(location => ({
      name: location.name,
      coordinates: location.coordinates,
      data: this.mockData.slice(0, 30),
    }));

    return locations.slice(0, 5); // Return fewer results for nearby search
  }

  /**
   * Get weather data with custom coordinates
   */
  async getWeatherDataByCoordinates(
    latitude: number,
    longitude: number,
    startDate: string,
    endDate: string,
    timeResolution: TimeResolution = 'daily'
  ): Promise<WeatherDataPoint[]> {
    if (this.useNasaApi) {
      try {
        const startDateFormatted = this.formatDateForNasaApi(startDate);
        const endDateFormatted = this.formatDateForNasaApi(endDate);

        const nasaRequest: NasaApiRequest = {
          latitude,
          longitude,
          startDate: startDateFormatted,
          endDate: endDateFormatted,
          parameters: [
            NASA_API_CONFIG.PARAMETERS.TEMPERATURE_AVG,
            NASA_API_CONFIG.PARAMETERS.TEMPERATURE_MAX,
            NASA_API_CONFIG.PARAMETERS.TEMPERATURE_MIN,
            NASA_API_CONFIG.PARAMETERS.HUMIDITY_RELATIVE,
            NASA_API_CONFIG.PARAMETERS.HUMIDITY_SPECIFIC,
            NASA_API_CONFIG.PARAMETERS.WIND_SPEED,
            NASA_API_CONFIG.PARAMETERS.WIND_DIRECTION,
            NASA_API_CONFIG.PARAMETERS.PRECIPITATION,
            NASA_API_CONFIG.PARAMETERS.PRESSURE,
            NASA_API_CONFIG.PARAMETERS.SOLAR_RADIATION,
          ],
          timeResolution
        };

        return await this.nasaService.fetchWeatherData(nasaRequest);
      } catch (error) {
        console.error('NASA API failed for coordinates:', error);
        throw error;
      }
    } else {
      throw new Error('NASA API is disabled. Cannot fetch data for custom coordinates.');
    }
  }

  /**
   * Get hourly weather data
   */
  async getHourlyWeatherData(
    location: string,
    startDate: string,
    endDate: string
  ): Promise<WeatherDataPoint[]> {
    return this.getWeatherData(location, startDate, endDate, 'hourly');
  }

  /**
   * Get monthly weather data
   */
  async getMonthlyWeatherData(
    location: string,
    startDate: string,
    endDate: string
  ): Promise<WeatherDataPoint[]> {
    return this.getWeatherData(location, startDate, endDate, 'monthly');
  }

  /**
   * Get historical weather data (same as getWeatherData but with explicit naming)
   */
  async getHistoricalWeather(
    location: string,
    startDate: string,
    endDate: string,
    timeResolution: TimeResolution = 'daily'
  ): Promise<WeatherDataPoint[]> {
    return this.getWeatherData(location, startDate, endDate, timeResolution);
  }

  /**
   * Toggle NASA API usage
   */
  setUseNasaApi(useNasaApi: boolean): void {
    this.useNasaApi = useNasaApi;
  }

  /**
   * Get NASA service cache statistics
   */
  getCacheStats(): { size: number; keys: string[] } {
    return this.nasaService.getCacheStats();
  }

  /**
   * Clear NASA service cache
   */
  clearCache(): void {
    this.nasaService.clearCache();
  }
}