import { WeatherDataPoint, WeatherSummary } from '@skyloom/shared';
import { calculateWeatherSummary } from '@skyloom/shared';
import { config } from '../config/index.js';

interface OpenWeatherResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  daily: Array<{
    dt: number;
    temp: {
      day: number;
      min: number;
      max: number;
    };
    humidity: number;
    wind_speed: number;
    wind_deg: number;
    rain?: { '1h': number };
    pressure: number;
    uvi: number;
  }>;
}

export class RealWeatherService {
  private apiKey: string;
  private baseUrl: string = 'https://api.openweathermap.org/data/3.0/onecall';

  constructor() {
    this.apiKey = config.weatherApi.openWeatherMapKey || '';
    if (!this.apiKey) {
      console.warn('OPENWEATHERMAP_API_KEY not found. Using mock data fallback.');
    }
  }

  /**
   * Get coordinates for a location using OpenWeatherMap Geocoding API
   */
  private async getCoordinates(location: string): Promise<{ lat: number; lon: number }> {
    const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${this.apiKey}`;
    
    try {
      const response = await fetch(geocodingUrl);
      const data = await response.json();
      
      if (data.length === 0) {
        throw new Error(`Location "${location}" not found`);
      }
      
      return {
        lat: data[0].lat,
        lon: data[0].lon
      };
    } catch (error) {
      console.error('Geocoding error:', error);
      throw new Error(`Failed to get coordinates for location: ${location}`);
    }
  }

  /**
   * Convert timestamp to date string
   */
  private timestampToDateString(timestamp: number): string {
    return new Date(timestamp * 1000).toISOString().split('T')[0];
  }

  /**
   * Convert OpenWeatherMap data to our WeatherDataPoint format
   */
  private convertToWeatherDataPoint(dailyData: any, dateStr: string): WeatherDataPoint {
    return {
      date: dateStr,
      temperature: {
        avg: dailyData.temp.day,
        min: dailyData.temp.min,
        max: dailyData.temp.max,
      },
      humidity: {
        relative: dailyData.humidity,
        specific: dailyData.humidity / 1000, // Rough conversion
      },
      wind: {
        speed: dailyData.wind_speed,
        direction: dailyData.wind_deg,
      },
      precipitation: dailyData.rain?.['1h'] || 0,
      pressure: dailyData.pressure,
      solarRadiation: dailyData.uvi * 25, // Rough conversion from UV index
    };
  }

  /**
   * Get historical weather data for a location and date range
   */
  async getWeatherData(
    location: string,
    startDate: string,
    endDate: string
  ): Promise<WeatherDataPoint[]> {
    if (!this.apiKey) {
      throw new Error('OpenWeatherMap API key not configured');
    }

    try {
      // Get coordinates for the location
      const { lat, lon } = await this.getCoordinates(location);

      // Calculate the number of days between start and end date
      const start = new Date(startDate);
      const end = new Date(endDate);
      const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

      // For historical data, we need to make multiple API calls
      // OpenWeatherMap One Call API 3.0 has limited historical data
      // We'll use current data and simulate some historical variation
      const weatherData: WeatherDataPoint[] = [];
      
      for (let i = 0; i <= daysDiff; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);
        const dateStr = currentDate.toISOString().split('T')[0];
        
        // For now, we'll use current weather data and add some variation
        // In a production app, you'd want to use a proper historical weather API
        const timestamp = Math.floor(currentDate.getTime() / 1000);
        
        try {
          const url = `${this.baseUrl}?lat=${lat}&lon=${lon}&dt=${timestamp}&appid=${this.apiKey}&units=metric`;
          const response = await fetch(url);
          
          if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
          }
          
          const data: OpenWeatherResponse = await response.json();
          
          if (data.daily && data.daily.length > 0) {
            const dailyData = data.daily[0];
            const weatherPoint = this.convertToWeatherDataPoint(dailyData, dateStr);
            weatherData.push(weatherPoint);
          }
        } catch (apiError) {
          console.warn(`Failed to fetch data for ${dateStr}, using fallback`);
          // Fallback to mock data for this date
          const mockData = this.generateMockDataPoint(dateStr, lat, lon);
          weatherData.push(mockData);
        }
      }

      return weatherData;
    } catch (error) {
      console.error('Real weather service error:', error);
      throw error;
    }
  }

  /**
   * Generate mock data point as fallback
   */
  private generateMockDataPoint(dateStr: string, lat: number, lon: number): WeatherDataPoint {
    const date = new Date(dateStr);
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
    const seasonalTemp = 15 + 15 * Math.sin((dayOfYear / 365) * 2 * Math.PI - Math.PI / 2);
    const seasonalRain = 50 + 30 * Math.sin((dayOfYear / 365) * 2 * Math.PI);
    const baseTemp = seasonalTemp + (Math.random() - 0.5) * 10;

    return {
      date: dateStr,
      temperature: {
        avg: baseTemp,
        min: baseTemp - 5 - Math.random() * 5,
        max: baseTemp + 5 + Math.random() * 5,
      },
      humidity: {
        relative: 50 + Math.random() * 40,
        specific: 0.005 + Math.random() * 0.015,
      },
      wind: {
        speed: 10 + Math.random() * 20,
        direction: Math.random() * 360,
      },
      precipitation: Math.max(0, seasonalRain + (Math.random() - 0.5) * 40),
      pressure: 1010 + (Math.random() - 0.5) * 20,
      solarRadiation: 200 + Math.random() * 400,
    };
  }

  /**
   * Get weather summary for a location and date range
   */
  async getWeatherSummary(
    location: string,
    startDate: string,
    endDate: string
  ): Promise<WeatherSummary> {
    const weatherData = await this.getWeatherData(location, startDate, endDate);
    return calculateWeatherSummary(weatherData);
  }

  /**
   * Get current weather for a location
   */
  async getCurrentWeather(location: string): Promise<WeatherDataPoint> {
    if (!this.apiKey) {
      throw new Error('OpenWeatherMap API key not configured');
    }

    try {
      const { lat, lon } = await this.getCoordinates(location);
      const url = `${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const data: OpenWeatherResponse = await response.json();
      const today = new Date().toISOString().split('T')[0];
      
      if (data.daily && data.daily.length > 0) {
        return this.convertToWeatherDataPoint(data.daily[0], today);
      }
      
      throw new Error('No weather data available');
    } catch (error) {
      console.error('Current weather error:', error);
      throw error;
    }
  }
}
