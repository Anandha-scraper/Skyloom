import { Request, Response } from 'express';
import { WeatherService } from '../services/weatherService.js';
import { 
  ApiResponse, 
  WeatherApiResponse, 
  SummaryApiResponse,
  LocationsApiResponse 
} from '@climatesight/shared';

const weatherService = new WeatherService();

// Get weather data for a location and date range
export const getWeatherData = async (req: Request, res: Response) => {
  try {
    const { location, startDate, endDate } = req.query;

    if (!location || !startDate || !endDate) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Missing required parameters',
        message: 'location, startDate, and endDate are required',
      };
      return res.status(400).json(response);
    }

    const weatherData = await weatherService.getWeatherData(
      location as string,
      startDate as string,
      endDate as string
    );

    const response: WeatherApiResponse = {
      success: true,
      data: weatherData,
    };

    res.json(response);
  } catch (error) {
    console.error('Get weather data error:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch weather data',
    };
    res.status(500).json(response);
  }
};

// Get weather summary statistics
export const getWeatherSummary = async (req: Request, res: Response) => {
  try {
    const { location, startDate, endDate } = req.query;

    if (!location || !startDate || !endDate) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Missing required parameters',
        message: 'location, startDate, and endDate are required',
      };
      return res.status(400).json(response);
    }

    const summary = await weatherService.getWeatherSummary(
      location as string,
      startDate as string,
      endDate as string
    );

    const response: SummaryApiResponse = {
      success: true,
      data: summary,
    };

    res.json(response);
  } catch (error) {
    console.error('Get weather summary error:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch weather summary',
    };
    res.status(500).json(response);
  }
};

// Get available locations
export const getLocations = async (req: Request, res: Response) => {
  try {
    const locations = await weatherService.getLocations();

    const response: LocationsApiResponse = {
      success: true,
      data: locations,
    };

    res.json(response);
  } catch (error) {
    console.error('Get locations error:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch locations',
    };
    res.status(500).json(response);
  }
};

// Search locations by query
export const searchLocations = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== 'string') {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Missing query parameter',
        message: 'q parameter is required',
      };
      return res.status(400).json(response);
    }

    const locations = await weatherService.searchLocations(q);

    const response: LocationsApiResponse = {
      success: true,
      data: locations,
    };

    res.json(response);
  } catch (error) {
    console.error('Search locations error:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to search locations',
    };
    res.status(500).json(response);
  }
};

// Get nearby places by coordinates
export const getNearbyPlaces = async (req: Request, res: Response) => {
  try {
    const { lat, lng, radius } = req.query;

    if (!lat || !lng) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Missing required parameters',
        message: 'lat and lng parameters are required',
      };
      return res.status(400).json(response);
    }

    const latitude = parseFloat(lat as string);
    const longitude = parseFloat(lng as string);
    const searchRadius = radius ? parseInt(radius as string) : 50000; // Default 50km

    if (isNaN(latitude) || isNaN(longitude)) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Invalid coordinates',
        message: 'lat and lng must be valid numbers',
      };
      return res.status(400).json(response);
    }

    const locations = await weatherService.getNearbyPlaces(latitude, longitude, searchRadius);

    const response: LocationsApiResponse = {
      success: true,
      data: locations,
    };

    res.json(response);
  } catch (error) {
    console.error('Get nearby places error:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to get nearby places',
    };
    res.status(500).json(response);
  }
};