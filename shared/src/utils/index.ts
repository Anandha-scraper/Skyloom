import { WeatherDataPoint, WeatherSummary } from "../types";

/**
 * Generates mock weather data for a given year range
 */
export function generateMockData(startYear: number, endYear: number): WeatherDataPoint[] {
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

/**
 * Filters weather data by date range
 */
export function filterWeatherDataByDateRange(
  data: WeatherDataPoint[],
  startDate: string,
  endDate: string
): WeatherDataPoint[] {
  return data.filter(d => d.date >= startDate && d.date <= endDate);
}

/**
 * Calculates weather statistics and trends
 */
export function calculateWeatherSummary(data: WeatherDataPoint[]): WeatherSummary {
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

/**
 * Formats date for display
 */
export function formatDate(date: Date | string, format: string = "MMM dd, yyyy"): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (format === "yyyy-MM-dd") {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}

/**
 * Formats date for chart display
 */
export function formatDateForChart(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
  });
}

/**
 * Generates chart data with formatted dates
 */
export function generateChartData(data: WeatherDataPoint[]) {
  return data.map(d => ({
    ...d,
    dateFormatted: formatDateForChart(d.date),
  }));
}

/**
 * Validates date range
 */
export function isValidDateRange(startDate: string, endDate: string): boolean {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start <= end && !isNaN(start.getTime()) && !isNaN(end.getTime());
}

/**
 * Gets trend direction and value
 */
export function getTrendInfo(trend: number) {
  if (trend > 0.1) return { direction: 'up', value: `+${Math.abs(trend).toFixed(1)}` };
  if (trend < -0.1) return { direction: 'down', value: `-${Math.abs(trend).toFixed(1)}` };
  return { direction: 'stable', value: 'Stable' };
}