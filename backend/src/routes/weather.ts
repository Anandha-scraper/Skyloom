import { Router } from 'express';
import { getWeatherData, getWeatherSummary, getLocations } from '../controllers/weatherController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/weather/data
router.get('/data', optionalAuth, getWeatherData);

// GET /api/weather/summary
router.get('/summary', optionalAuth, getWeatherSummary);

// GET /api/weather/locations
router.get('/locations', optionalAuth, getLocations);

export default router;