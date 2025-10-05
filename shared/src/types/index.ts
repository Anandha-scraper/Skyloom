import { z } from "zod";

// NASA API Response Types
export interface NasaPowerResponse {
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    parameter: {
      T2M?: { [key: string]: number }; // Average temperature
      T2M_MAX?: { [key: string]: number }; // Max temperature
      T2M_MIN?: { [key: string]: number }; // Min temperature
      RH2M?: { [key: string]: number }; // Relative humidity
      QV2M?: { [key: string]: number }; // Specific humidity
      WS2M?: { [key: string]: number }; // Wind speed
      WD2M?: { [key: string]: number }; // Wind direction
      PRECTOT?: { [key: string]: number }; // Precipitation
      PS?: { [key: string]: number }; // Surface pressure
      ALLSKY_SFC_SW_DWN?: { [key: string]: number }; // Solar radiation
    };
  };
}

// Enhanced Weather Data Types
export interface WeatherDataPoint {
  date: string;
  temperature: {
    avg: number;
    min: number;
    max: number;
  };
  humidity: {
    relative: number; // RH2M
    specific: number; // QV2M
  };
  wind: {
    speed: number; // WS2M
    direction: number; // WD2M
  };
  precipitation: number; // PRECTOT
  pressure: number; // PS
  solarRadiation: number; // ALLSKY_SFC_SW_DWN
}

// Location and Coordinate Types
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LocationData {
  name: string;
  coordinates: Coordinates;
  data: WeatherDataPoint[];
}

// Time Resolution Types
export type TimeResolution = 'hourly' | 'daily' | 'monthly';

// NASA API Request Parameters
export interface NasaApiRequest {
  latitude: number;
  longitude: number;
  startDate: string; // YYYYMMDD format
  endDate: string; // YYYYMMDD format
  parameters: string[]; // e.g., ['T2M', 'RH2M', 'WS2M']
  timeResolution: TimeResolution;
}

export interface WeatherSummary {
  temperature: { 
    min: number; 
    max: number; 
    avg: number; 
    trend: number;
  };
  humidity: { 
    relative: { min: number; max: number; avg: number; trend: number };
    specific: { min: number; max: number; avg: number; trend: number };
  };
  wind: { 
    speed: { min: number; max: number; avg: number; trend: number };
    direction: { avg: number; trend: number };
  };
  precipitation: { 
    total: number; 
    avg: number; 
    trend: number;
  };
  pressure: { 
    min: number; 
    max: number; 
    avg: number; 
    trend: number;
  };
  solarRadiation: { 
    min: number; 
    max: number; 
    avg: number; 
    trend: number;
  };
}

// Zod Schemas
export const CoordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const WeatherDataPointSchema = z.object({
  date: z.string(),
  temperature: z.object({
    avg: z.number(),
    min: z.number(),
    max: z.number(),
  }),
  humidity: z.object({
    relative: z.number(),
    specific: z.number(),
  }),
  wind: z.object({
    speed: z.number(),
    direction: z.number(),
  }),
  precipitation: z.number(),
  pressure: z.number(),
  solarRadiation: z.number(),
});

export const LocationDataSchema = z.object({
  name: z.string(),
  coordinates: CoordinatesSchema,
  data: z.array(WeatherDataPointSchema),
});

export const NasaApiRequestSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  parameters: z.array(z.string()),
  timeResolution: z.enum(['hourly', 'daily', 'monthly']),
});

export const WeatherSummarySchema = z.object({
  temperature: z.object({
    min: z.number(),
    max: z.number(),
    avg: z.number(),
    trend: z.number(),
  }),
  humidity: z.object({
    relative: z.object({
      min: z.number(),
      max: z.number(),
      avg: z.number(),
      trend: z.number(),
    }),
    specific: z.object({
      min: z.number(),
      max: z.number(),
      avg: z.number(),
      trend: z.number(),
    }),
  }),
  wind: z.object({
    speed: z.object({
      min: z.number(),
      max: z.number(),
      avg: z.number(),
      trend: z.number(),
    }),
    direction: z.object({
      avg: z.number(),
      trend: z.number(),
    }),
  }),
  precipitation: z.object({
    total: z.number(),
    avg: z.number(),
    trend: z.number(),
  }),
  pressure: z.object({
    min: z.number(),
    max: z.number(),
    avg: z.number(),
    trend: z.number(),
  }),
  solarRadiation: z.object({
    min: z.number(),
    max: z.number(),
    avg: z.number(),
    trend: z.number(),
  }),
});

// User Types
export interface User {
  id: string;
  username: string;
  password: string;
}

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
});

export const CreateUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface WeatherApiResponse extends ApiResponse<WeatherDataPoint[]> {}
export interface SummaryApiResponse extends ApiResponse<WeatherSummary> {}
export interface LocationsApiResponse extends ApiResponse<LocationData[]> {}
export interface UserApiResponse extends ApiResponse<User> {}

// Chart Types
export interface ChartDataPoint {
  date: string;
  dateFormatted: string;
  temperature: {
    avg: number;
    min: number;
    max: number;
  };
  humidity: {
    relative: number;
    specific: number;
  };
  wind: {
    speed: number;
    direction: number;
  };
  precipitation: number;
  pressure: number;
  solarRadiation: number;
}

export interface ChartConfig {
  width: number | string;
  height: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export interface ChartColors {
  temperature: string;
  humidity: string;
  wind: string;
  precipitation: string;
  pressure: string;
  solarRadiation: string;
}