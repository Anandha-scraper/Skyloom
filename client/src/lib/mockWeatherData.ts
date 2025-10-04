export interface WeatherDataPoint {
  date: string;
  temperature: number;
  rainfall: number;
  windSpeed: number;
  humidity: number;
  pressure: number;
}

export interface LocationData {
  name: string;
  coordinates: string;
  data: WeatherDataPoint[];
}

export const MOCK_LOCATIONS = [
  { name: "New York, USA", coordinates: "40.7128°N, 74.0060°W" },
  { name: "London, UK", coordinates: "51.5074°N, 0.1278°W" },
  { name: "Tokyo, Japan", coordinates: "35.6762°N, 139.6503°E" },
  { name: "Sydney, Australia", coordinates: "33.8688°S, 151.2093°E" },
  { name: "Mumbai, India", coordinates: "19.0760°N, 72.8777°E" },
];

function generateMockData(startYear: number, endYear: number): WeatherDataPoint[] {
  const data: WeatherDataPoint[] = [];
  const startDate = new Date(startYear, 0, 1);
  const endDate = new Date(endYear, 11, 31);
  
  let currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    const dayOfYear = Math.floor((currentDate.getTime() - new Date(currentDate.getFullYear(), 0, 0).getTime()) / 86400000);
    const seasonalTemp = 15 + 15 * Math.sin((dayOfYear / 365) * 2 * Math.PI - Math.PI / 2);
    const seasonalRain = 50 + 30 * Math.sin((dayOfYear / 365) * 2 * Math.PI);
    
    data.push({
      date: currentDate.toISOString().split('T')[0],
      temperature: seasonalTemp + (Math.random() - 0.5) * 10,
      rainfall: Math.max(0, seasonalRain + (Math.random() - 0.5) * 40),
      windSpeed: 10 + Math.random() * 20,
      humidity: 50 + Math.random() * 40,
      pressure: 1010 + (Math.random() - 0.5) * 20,
    });
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return data;
}

export function getMockWeatherData(
  location: string,
  startDate: string,
  endDate: string
): WeatherDataPoint[] {
  const allData = generateMockData(2020, 2024);
  
  return allData.filter(d => d.date >= startDate && d.date <= endDate);
}

export function getDataSummary(data: WeatherDataPoint[]) {
  if (data.length === 0) {
    return {
      temperature: { min: 0, max: 0, avg: 0, trend: 0 },
      rainfall: { min: 0, max: 0, avg: 0, trend: 0 },
      windSpeed: { min: 0, max: 0, avg: 0, trend: 0 },
      humidity: { min: 0, max: 0, avg: 0, trend: 0 },
    };
  }
  
  const temps = data.map(d => d.temperature);
  const rain = data.map(d => d.rainfall);
  const wind = data.map(d => d.windSpeed);
  const humid = data.map(d => d.humidity);
  
  const calcStats = (values: number[]) => {
    const sorted = [...values].sort((a, b) => a - b);
    const avg = values.reduce((sum, v) => sum + v, 0) / values.length;
    const halfLength = Math.floor(values.length / 2);
    const firstHalfAvg = values.slice(0, halfLength).reduce((sum, v) => sum + v, 0) / halfLength;
    const secondHalfAvg = values.slice(halfLength).reduce((sum, v) => sum + v, 0) / (values.length - halfLength);
    const trend = secondHalfAvg - firstHalfAvg;
    
    return {
      min: sorted[0],
      max: sorted[sorted.length - 1],
      avg,
      trend,
    };
  };
  
  return {
    temperature: calcStats(temps),
    rainfall: calcStats(rain),
    windSpeed: calcStats(wind),
    humidity: calcStats(humid),
  };
}
