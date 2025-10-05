import { WeatherDataPoint, WeatherSummary } from '@climatesight/shared';

const API_BASE_URL = 'http://localhost:3002/api';
console.log('Using hardcoded API_BASE_URL:', API_BASE_URL);

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export class WeatherApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
    console.log('WeatherApiService initialized with baseUrl:', this.baseUrl);
  }

  private async makeRequest<T>(endpoint: string, params: Record<string, string>): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    console.log(`Making API request to: ${url.toString()}`);

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log(`Response status: ${response.status}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error Response:`, errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse<T> = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'API request failed');
      }

      return data.data as T;
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  async getWeatherData(
    location: string,
    startDate: string,
    endDate: string
  ): Promise<WeatherDataPoint[]> {
    return this.makeRequest<WeatherDataPoint[]>('/weather/data', {
      location,
      startDate,
      endDate,
    });
  }

  async getWeatherSummary(
    location: string,
    startDate: string,
    endDate: string
  ): Promise<WeatherSummary> {
    return this.makeRequest<WeatherSummary>('/weather/summary', {
      location,
      startDate,
      endDate,
    });
  }

  async getLocations(): Promise<any[]> {
    return this.makeRequest<any[]>('/weather/locations', {});
  }

  async searchLocations(query: string): Promise<any[]> {
    return this.makeRequest<any[]>('/weather/search-locations', {
      q: query,
    });
  }

  async getNearbyPlaces(latitude: number, longitude: number, radius?: number): Promise<any[]> {
    const params: Record<string, string> = {
      lat: latitude.toString(),
      lng: longitude.toString(),
    };
    
    if (radius) {
      params.radius = radius.toString();
    }

    return this.makeRequest<any[]>('/weather/nearby-places', params);
  }
}

export const weatherApiService = new WeatherApiService();
