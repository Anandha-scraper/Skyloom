import { Router } from 'express';
import { getWeatherData, getWeatherSummary, getLocations, searchLocations, getNearbyPlaces } from '../controllers/weatherController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/weather/data
router.get('/data', optionalAuth, getWeatherData);

// GET /api/weather/summary
router.get('/summary', optionalAuth, getWeatherSummary);

// GET /api/weather/locations
router.get('/locations', optionalAuth, getLocations);

// GET /api/weather/search-locations
router.get('/search-locations', optionalAuth, searchLocations);

// GET /api/weather/nearby-places
router.get('/nearby-places', optionalAuth, getNearbyPlaces);

export default router;