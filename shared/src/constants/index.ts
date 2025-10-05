// Mock Locations Data with Coordinates - Comprehensive Global Dataset
export const MOCK_LOCATIONS = [
  // North America
  { name: "New York, USA", coordinates: { latitude: 40.7128, longitude: -74.0060 } },
  { name: "Los Angeles, USA", coordinates: { latitude: 34.0522, longitude: -118.2437 } },
  { name: "Chicago, USA", coordinates: { latitude: 41.8781, longitude: -87.6298 } },
  { name: "Houston, USA", coordinates: { latitude: 29.7604, longitude: -95.3698 } },
  { name: "Phoenix, USA", coordinates: { latitude: 33.4484, longitude: -112.0740 } },
  { name: "Philadelphia, USA", coordinates: { latitude: 39.9526, longitude: -75.1652 } },
  { name: "San Antonio, USA", coordinates: { latitude: 29.4241, longitude: -98.4936 } },
  { name: "San Diego, USA", coordinates: { latitude: 32.7157, longitude: -117.1611 } },
  { name: "Dallas, USA", coordinates: { latitude: 32.7767, longitude: -96.7970 } },
  { name: "San Jose, USA", coordinates: { latitude: 37.3382, longitude: -121.8863 } },
  { name: "Toronto, Canada", coordinates: { latitude: 43.6532, longitude: -79.3832 } },
  { name: "Vancouver, Canada", coordinates: { latitude: 49.2827, longitude: -123.1207 } },
  { name: "Montreal, Canada", coordinates: { latitude: 45.5017, longitude: -73.5673 } },
  { name: "Mexico City, Mexico", coordinates: { latitude: 19.4326, longitude: -99.1332 } },

  // Europe
  { name: "London, UK", coordinates: { latitude: 51.5074, longitude: -0.1278 } },
  { name: "Paris, France", coordinates: { latitude: 48.8566, longitude: 2.3522 } },
  { name: "Berlin, Germany", coordinates: { latitude: 52.5200, longitude: 13.4050 } },
  { name: "Madrid, Spain", coordinates: { latitude: 40.4168, longitude: -3.7038 } },
  { name: "Rome, Italy", coordinates: { latitude: 41.9028, longitude: 12.4964 } },
  { name: "Amsterdam, Netherlands", coordinates: { latitude: 52.3676, longitude: 4.9041 } },
  { name: "Vienna, Austria", coordinates: { latitude: 48.2082, longitude: 16.3738 } },
  { name: "Zurich, Switzerland", coordinates: { latitude: 47.3769, longitude: 8.5417 } },
  { name: "Stockholm, Sweden", coordinates: { latitude: 59.3293, longitude: 18.0686 } },
  { name: "Copenhagen, Denmark", coordinates: { latitude: 55.6761, longitude: 12.5683 } },
  { name: "Oslo, Norway", coordinates: { latitude: 59.9139, longitude: 10.7522 } },
  { name: "Helsinki, Finland", coordinates: { latitude: 60.1699, longitude: 24.9384 } },
  { name: "Moscow, Russia", coordinates: { latitude: 55.7558, longitude: 37.6176 } },
  { name: "Warsaw, Poland", coordinates: { latitude: 52.2297, longitude: 21.0122 } },
  { name: "Prague, Czech Republic", coordinates: { latitude: 50.0755, longitude: 14.4378 } },
  { name: "Budapest, Hungary", coordinates: { latitude: 47.4979, longitude: 19.0402 } },
  { name: "Lisbon, Portugal", coordinates: { latitude: 38.7223, longitude: -9.1393 } },
  { name: "Athens, Greece", coordinates: { latitude: 37.9838, longitude: 23.7275 } },
  { name: "Istanbul, Turkey", coordinates: { latitude: 41.0082, longitude: 28.9784 } },

  // Asia
  { name: "Tokyo, Japan", coordinates: { latitude: 35.6762, longitude: 139.6503 } },
  { name: "Osaka, Japan", coordinates: { latitude: 34.6937, longitude: 135.5023 } },
  { name: "Kyoto, Japan", coordinates: { latitude: 35.0116, longitude: 135.7681 } },
  { name: "Seoul, South Korea", coordinates: { latitude: 37.5665, longitude: 126.9780 } },
  { name: "Busan, South Korea", coordinates: { latitude: 35.1796, longitude: 129.0756 } },
  { name: "Beijing, China", coordinates: { latitude: 39.9042, longitude: 116.4074 } },
  { name: "Shanghai, China", coordinates: { latitude: 31.2304, longitude: 121.4737 } },
  { name: "Guangzhou, China", coordinates: { latitude: 23.1291, longitude: 113.2644 } },
  { name: "Shenzhen, China", coordinates: { latitude: 22.5431, longitude: 114.0579 } },
  { name: "Hong Kong", coordinates: { latitude: 22.3193, longitude: 114.1694 } },
  { name: "Taipei, Taiwan", coordinates: { latitude: 25.0330, longitude: 121.5654 } },
  { name: "Singapore", coordinates: { latitude: 1.3521, longitude: 103.8198 } },
  { name: "Kuala Lumpur, Malaysia", coordinates: { latitude: 3.1390, longitude: 101.6869 } },
  { name: "Bangkok, Thailand", coordinates: { latitude: 13.7563, longitude: 100.5018 } },
  { name: "Jakarta, Indonesia", coordinates: { latitude: -6.2088, longitude: 106.8456 } },
  { name: "Manila, Philippines", coordinates: { latitude: 14.5995, longitude: 120.9842 } },
  { name: "Ho Chi Minh City, Vietnam", coordinates: { latitude: 10.8231, longitude: 106.6297 } },
  { name: "Hanoi, Vietnam", coordinates: { latitude: 21.0285, longitude: 105.8542 } },
  { name: "Mumbai, India", coordinates: { latitude: 19.0760, longitude: 72.8777 } },
  { name: "Delhi, India", coordinates: { latitude: 28.7041, longitude: 77.1025 } },
  { name: "Bangalore, India", coordinates: { latitude: 12.9716, longitude: 77.5946 } },
  { name: "Chennai, India", coordinates: { latitude: 13.0827, longitude: 80.2707 } },
  { name: "Kolkata, India", coordinates: { latitude: 22.5726, longitude: 88.3639 } },
  { name: "Hyderabad, India", coordinates: { latitude: 17.3850, longitude: 78.4867 } },
  { name: "Pune, India", coordinates: { latitude: 18.5204, longitude: 73.8567 } },
  { name: "Ahmedabad, India", coordinates: { latitude: 23.0225, longitude: 72.5714 } },
  { name: "Karachi, Pakistan", coordinates: { latitude: 24.8607, longitude: 67.0011 } },
  { name: "Lahore, Pakistan", coordinates: { latitude: 31.5204, longitude: 74.3587 } },
  { name: "Dhaka, Bangladesh", coordinates: { latitude: 23.8103, longitude: 90.4125 } },
  { name: "Kathmandu, Nepal", coordinates: { latitude: 27.7172, longitude: 85.3240 } },
  { name: "Colombo, Sri Lanka", coordinates: { latitude: 6.9271, longitude: 79.8612 } },

  // Africa
  { name: "Cairo, Egypt", coordinates: { latitude: 30.0444, longitude: 31.2357 } },
  { name: "Lagos, Nigeria", coordinates: { latitude: 6.5244, longitude: 3.3792 } },
  { name: "Nairobi, Kenya", coordinates: { latitude: -1.2921, longitude: 36.8219 } },
  { name: "Cape Town, South Africa", coordinates: { latitude: -33.9249, longitude: 18.4241 } },
  { name: "Johannesburg, South Africa", coordinates: { latitude: -26.2041, longitude: 28.0473 } },
  { name: "Casablanca, Morocco", coordinates: { latitude: 33.5731, longitude: -7.5898 } },
  { name: "Tunis, Tunisia", coordinates: { latitude: 36.8065, longitude: 10.1815 } },
  { name: "Algiers, Algeria", coordinates: { latitude: 36.7538, longitude: 3.0588 } },
  { name: "Addis Ababa, Ethiopia", coordinates: { latitude: 9.1450, longitude: 38.7667 } },
  { name: "Kampala, Uganda", coordinates: { latitude: 0.3476, longitude: 32.5825 } },

  // South America
  { name: "São Paulo, Brazil", coordinates: { latitude: -23.5505, longitude: -46.6333 } },
  { name: "Rio de Janeiro, Brazil", coordinates: { latitude: -22.9068, longitude: -43.1729 } },
  { name: "Brasília, Brazil", coordinates: { latitude: -15.7801, longitude: -47.9292 } },
  { name: "Buenos Aires, Argentina", coordinates: { latitude: -34.6118, longitude: -58.3960 } },
  { name: "Santiago, Chile", coordinates: { latitude: -33.4489, longitude: -70.6693 } },
  { name: "Lima, Peru", coordinates: { latitude: -12.0464, longitude: -77.0428 } },
  { name: "Bogotá, Colombia", coordinates: { latitude: 4.7110, longitude: -74.0721 } },
  { name: "Caracas, Venezuela", coordinates: { latitude: 10.4806, longitude: -66.9036 } },
  { name: "Quito, Ecuador", coordinates: { latitude: -0.1807, longitude: -78.4678 } },
  { name: "La Paz, Bolivia", coordinates: { latitude: -16.2902, longitude: -68.1341 } },
  { name: "Montevideo, Uruguay", coordinates: { latitude: -34.9011, longitude: -56.1645 } },
  { name: "Asunción, Paraguay", coordinates: { latitude: -25.2637, longitude: -57.5759 } },

  // Oceania
  { name: "Sydney, Australia", coordinates: { latitude: -33.8688, longitude: 151.2093 } },
  { name: "Melbourne, Australia", coordinates: { latitude: -37.8136, longitude: 144.9631 } },
  { name: "Brisbane, Australia", coordinates: { latitude: -27.4698, longitude: 153.0251 } },
  { name: "Perth, Australia", coordinates: { latitude: -31.9505, longitude: 115.8605 } },
  { name: "Adelaide, Australia", coordinates: { latitude: -34.9285, longitude: 138.6007 } },
  { name: "Auckland, New Zealand", coordinates: { latitude: -36.8485, longitude: 174.7633 } },
  { name: "Wellington, New Zealand", coordinates: { latitude: -41.2865, longitude: 174.7762 } },
  { name: "Christchurch, New Zealand", coordinates: { latitude: -43.5321, longitude: 172.6362 } },

  // Middle East
  { name: "Dubai, UAE", coordinates: { latitude: 25.2048, longitude: 55.2708 } },
  { name: "Abu Dhabi, UAE", coordinates: { latitude: 24.4539, longitude: 54.3773 } },
  { name: "Riyadh, Saudi Arabia", coordinates: { latitude: 24.7136, longitude: 46.6753 } },
  { name: "Jeddah, Saudi Arabia", coordinates: { latitude: 21.4858, longitude: 39.1925 } },
  { name: "Doha, Qatar", coordinates: { latitude: 25.2854, longitude: 51.5310 } },
  { name: "Kuwait City, Kuwait", coordinates: { latitude: 29.3759, longitude: 47.9774 } },
  { name: "Manama, Bahrain", coordinates: { latitude: 26.0667, longitude: 50.5577 } },
  { name: "Muscat, Oman", coordinates: { latitude: 23.5880, longitude: 58.3829 } },
  { name: "Tehran, Iran", coordinates: { latitude: 35.6892, longitude: 51.3890 } },
  { name: "Baghdad, Iraq", coordinates: { latitude: 33.3152, longitude: 44.3661 } },
  { name: "Damascus, Syria", coordinates: { latitude: 33.5138, longitude: 36.2765 } },
  { name: "Beirut, Lebanon", coordinates: { latitude: 33.8938, longitude: 35.5018 } },
  { name: "Amman, Jordan", coordinates: { latitude: 31.9454, longitude: 35.9284 } },
  { name: "Jerusalem, Israel", coordinates: { latitude: 31.7683, longitude: 35.2137 } },
  { name: "Tel Aviv, Israel", coordinates: { latitude: 32.0853, longitude: 34.7818 } },
];

// Chart Colors Configuration
export const CHART_COLORS = {
  temperature: "hsl(var(--chart-1))",
  humidity: "hsl(var(--chart-2))",
  wind: "hsl(var(--chart-3))",
  precipitation: "hsl(var(--chart-4))",
  pressure: "hsl(var(--chart-5))",
  solarRadiation: "hsl(var(--chart-6))",
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
  HUMIDITY_RELATIVE: "%",
  HUMIDITY_SPECIFIC: "g/kg",
  WIND_SPEED: "m/s",
  WIND_DIRECTION: "°",
  PRECIPITATION: "mm",
  PRESSURE: "hPa",
  SOLAR_RADIATION: "W/m²",
} as const;

// NASA API Configuration
export const NASA_API_CONFIG = {
  BASE_URL: "https://power.larc.nasa.gov/api",
  PARAMETERS: {
    TEMPERATURE_AVG: "T2M",
    TEMPERATURE_MAX: "T2M_MAX", 
    TEMPERATURE_MIN: "T2M_MIN",
    HUMIDITY_RELATIVE: "RH2M",
    HUMIDITY_SPECIFIC: "QV2M",
    WIND_SPEED: "WS2M",
    WIND_DIRECTION: "WD2M",
    PRECIPITATION: "PRECTOT",
    PRESSURE: "PS",
    SOLAR_RADIATION: "ALLSKY_SFC_SW_DWN",
  },
  COMMUNITIES: {
    AG: "AG", // Agriculture
    SB: "SB", // Sustainable Buildings
    RE: "RE", // Renewable Energy
  },
} as const;