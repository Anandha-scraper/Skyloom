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