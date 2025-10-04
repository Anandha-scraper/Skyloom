// Mock Locations Data
export const MOCK_LOCATIONS = [
  { name: "New York, USA", coordinates: "40.7128°N, 74.0060°W" },
  { name: "London, UK", coordinates: "51.5074°N, 0.1278°W" },
  { name: "Tokyo, Japan", coordinates: "35.6762°N, 139.6503°E" },
  { name: "Sydney, Australia", coordinates: "33.8688°S, 151.2093°E" },
  { name: "Mumbai, India", coordinates: "19.0760°N, 72.8777°E" },
];

// Chart Colors Configuration
export const CHART_COLORS = {
  temperature: "hsl(var(--chart-1))",
  rainfall: "hsl(var(--chart-2))",
  windSpeed: "hsl(var(--chart-4))",
  humidity: "hsl(var(--chart-2))",
  pressure: "hsl(var(--chart-5))",
};

// Default Chart Configuration
export const DEFAULT_CHART_CONFIG = {
  width: "100%",
  height: 400,
  margin: {
    top: 20,
    right: 30,
    bottom: 20,
    left: 20,
  },
};

// API Endpoints
export const API_ENDPOINTS = {
  WEATHER: "/api/weather",
  SUMMARY: "/api/summary",
  LOCATIONS: "/api/locations",
  USERS: "/api/users",
  AUTH: "/api/auth",
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: "MMM dd, yyyy",
  API: "yyyy-MM-dd",
  CHART: "MMM dd",
} as const;

// Weather Units
export const WEATHER_UNITS = {
  TEMPERATURE: "°C",
  RAINFALL: "mm",
  WIND_SPEED: "km/h",
  HUMIDITY: "%",
  PRESSURE: "hPa",
} as const;