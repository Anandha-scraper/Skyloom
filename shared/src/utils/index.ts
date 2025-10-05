import { WeatherDataPoint, WeatherSummary } from "../types";

/**
 * Seeded random number generator for consistent data generation
 */
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}

/**
 * Generates mock weather data for a given year range
 * Uses seeded random number generator to ensure consistent data between server and client
 */
export function generateMockData(startYear: number, endYear: number): WeatherDataPoint[] {
  const data: WeatherDataPoint[] = [];
  const startDate = new Date(startYear, 0, 1);
  const endDate = new Date(endYear, 11, 31);
  
  let currentDate = new Date(startDate);
  
  // Use a fixed seed based on the year range to ensure consistency
  const seed = startYear * 1000 + endYear;
  const rng = new SeededRandom(seed);
  
  while (currentDate <= endDate) {
    const dayOfYear = Math.floor((currentDate.getTime() - new Date(currentDate.getFullYear(), 0, 0).getTime()) / 86400000);
    const seasonalTemp = 15 + 15 * Math.sin((dayOfYear / 365) * 2 * Math.PI - Math.PI / 2);
    const seasonalRain = 50 + 30 * Math.sin((dayOfYear / 365) * 2 * Math.PI);
    const baseTemp = seasonalTemp + (rng.next() - 0.5) * 10;
    
    data.push({
      date: currentDate.toISOString().split('T')[0],
      temperature: {
        avg: baseTemp,
        min: baseTemp - 5 - rng.next() * 5,
        max: baseTemp + 5 + rng.next() * 5,
      },
      humidity: {
        relative: 50 + rng.next() * 40,
        specific: 0.005 + rng.next() * 0.015,
      },
      wind: {
        speed: 10 + rng.next() * 20,
        direction: rng.next() * 360,
      },
      precipitation: Math.max(0, seasonalRain + (rng.next() - 0.5) * 40),
      pressure: 1010 + (rng.next() - 0.5) * 20,
      solarRadiation: 200 + rng.next() * 400,
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
      humidity: {
        relative: { min: 0, max: 0, avg: 0, trend: 0 },
        specific: { min: 0, max: 0, avg: 0, trend: 0 },
      },
      wind: {
        speed: { min: 0, max: 0, avg: 0, trend: 0 },
        direction: { avg: 0, trend: 0 },
      },
      precipitation: { total: 0, avg: 0, trend: 0 },
      pressure: { min: 0, max: 0, avg: 0, trend: 0 },
      solarRadiation: { min: 0, max: 0, avg: 0, trend: 0 },
    };
  }
  
  const tempAvgs = data.map(d => d.temperature.avg);
  const tempMins = data.map(d => d.temperature.min);
  const tempMaxs = data.map(d => d.temperature.max);
  const relHumidity = data.map(d => d.humidity.relative);
  const specHumidity = data.map(d => d.humidity.specific);
  const windSpeeds = data.map(d => d.wind.speed);
  const windDirections = data.map(d => d.wind.direction);
  const precipitation = data.map(d => d.precipitation);
  const pressure = data.map(d => d.pressure);
  const solarRadiation = data.map(d => d.solarRadiation);
  
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
  
  const calcDirectionStats = (values: number[]) => {
    const avg = values.reduce((sum, v) => sum + v, 0) / values.length;
    const halfLength = Math.floor(values.length / 2);
    const firstHalfAvg = values.slice(0, halfLength).reduce((sum, v) => sum + v, 0) / halfLength;
    const secondHalfAvg = values.slice(halfLength).reduce((sum, v) => sum + v, 0) / (values.length - halfLength);
    const trend = secondHalfAvg - firstHalfAvg;
    
    return { avg, trend };
  };
  
  return {
    temperature: {
      min: Math.min(...tempMins),
      max: Math.max(...tempMaxs),
      avg: tempAvgs.reduce((sum, v) => sum + v, 0) / tempAvgs.length,
      trend: calcStats(tempAvgs).trend,
    },
    humidity: {
      relative: calcStats(relHumidity),
      specific: calcStats(specHumidity),
    },
    wind: {
      speed: calcStats(windSpeeds),
      direction: calcDirectionStats(windDirections),
    },
    precipitation: {
      total: precipitation.reduce((sum, v) => sum + v, 0),
      avg: precipitation.reduce((sum, v) => sum + v, 0) / precipitation.length,
      trend: calcStats(precipitation).trend,
    },
    pressure: calcStats(pressure),
    solarRadiation: calcStats(solarRadiation),
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
 * Generates chart data with formatted dates and flattened structure for charts
 */
export function generateChartData(data: WeatherDataPoint[]) {
  return data.map(d => ({
    date: d.date,
    dateFormatted: formatDateForChart(d.date),
    // Flatten temperature data
    temperature: d.temperature.avg,
    temperatureMin: d.temperature.min,
    temperatureMax: d.temperature.max,
    // Flatten humidity data
    humidity: d.humidity.relative,
    humiditySpecific: d.humidity.specific,
    // Flatten wind data
    windSpeed: d.wind.speed,
    windDirection: d.wind.direction,
    // Other data
    precipitation: d.precipitation,
    pressure: d.pressure,
    solarRadiation: d.solarRadiation,
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