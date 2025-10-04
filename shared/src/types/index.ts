import { z } from "zod";

// Weather Data Types
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

export interface WeatherSummary {
  temperature: { min: number; max: number; avg: number; trend: number };
  rainfall: { min: number; max: number; avg: number; trend: number };
  windSpeed: { min: number; max: number; avg: number; trend: number };
  humidity: { min: number; max: number; avg: number; trend: number };
}

// Zod Schemas
export const WeatherDataPointSchema = z.object({
  date: z.string(),
  temperature: z.number(),
  rainfall: z.number(),
  windSpeed: z.number(),
  humidity: z.number(),
  pressure: z.number(),
});

export const LocationDataSchema = z.object({
  name: z.string(),
  coordinates: z.string(),
  data: z.array(WeatherDataPointSchema),
});

export const WeatherSummarySchema = z.object({
  temperature: z.object({
    min: z.number(),
    max: z.number(),
    avg: z.number(),
    trend: z.number(),
  }),
  rainfall: z.object({
    min: z.number(),
    max: z.number(),
    avg: z.number(),
    trend: z.number(),
  }),
  windSpeed: z.object({
    min: z.number(),
    max: z.number(),
    avg: z.number(),
    trend: z.number(),
  }),
  humidity: z.object({
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
  temperature: number;
  rainfall: number;
  windSpeed: number;
  humidity: number;
  pressure: number;
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
  rainfall: string;
  windSpeed: string;
  humidity: string;
  pressure: string;
}