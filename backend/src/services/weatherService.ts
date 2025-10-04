import { 
  generateMockData, 
  filterWeatherDataByDateRange, 
  calculateWeatherSummary,
  MOCK_LOCATIONS,
  WeatherDataPoint,
  WeatherSummary,
  LocationData
} from '@climatesight/shared';

export class WeatherService {
  private mockData: WeatherDataPoint[];

  constructor() {
    // Generate mock data once on service initialization
    this.mockData = generateMockData(1990, 2030);
  }

  async getWeatherData(
    location: string,
    startDate: string,
    endDate: string
  ): Promise<WeatherDataPoint[]> {
    // In a real implementation, this would query a weather API or database
    // For now, we'll use the mock data with location filtering
    
    const filteredData = filterWeatherDataByDateRange(
      this.mockData,
      startDate,
      endDate
    );

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));

    return filteredData;
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

  // Future: Add methods for real weather API integration
  async getRealTimeWeather(location: string): Promise<WeatherDataPoint | null> {
    // This would integrate with a real weather API like OpenWeatherMap
    // For now, return null to indicate it's not implemented
    return null;
  }

  async getHistoricalWeather(
    location: string,
    startDate: string,
    endDate: string
  ): Promise<WeatherDataPoint[]> {
    // This would query historical weather data from a weather service
    // For now, use mock data
    return this.getWeatherData(location, startDate, endDate);
  }
}