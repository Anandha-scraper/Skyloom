import { Router } from 'express';
import { login, register, logout } from '../controllers/authController.js';
import { validateLogin, validateRegister } from '../controllers/authController.js';

const router = Router();

// POST /api/auth/login
router.post('/login', validateLogin, login);

// POST /api/auth/register
router.post('/register', validateRegister, register);

// POST /api/auth/logout
router.post('/logout', logout);

export default router;