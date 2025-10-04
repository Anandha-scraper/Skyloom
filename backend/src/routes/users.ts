import { Router } from 'express';
import { getUserProfile, updateUserProfile, deleteUser } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// All user routes require authentication
router.use(authenticateToken);

// GET /api/users/profile
router.get('/profile', getUserProfile);

// PUT /api/users/profile
router.put('/profile', updateUserProfile);

// DELETE /api/users/profile
router.delete('/profile', deleteUser);

export default router;