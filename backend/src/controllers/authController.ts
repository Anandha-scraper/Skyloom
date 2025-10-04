import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/userService.js';
import { ApiResponse, UserApiResponse, CreateUserSchema } from '@climatesight/shared';

const userService = new UserService();

// Validation middleware
export const validateLogin = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const validateRegister = [
  body('username')
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3 and 50 characters'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

// Login endpoint
export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Validation failed',
        message: errors.array().map(e => e.msg).join(', '),
      };
      return res.status(400).json(response);
    }

    const { username, password } = req.body;

    // Find user
    const user = await userService.getUserByUsername(username);
    if (!user) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Invalid credentials',
      };
      return res.status(401).json(response);
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Invalid credentials',
      };
      return res.status(401).json(response);
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    const response: UserApiResponse = {
      success: true,
      data: {
        id: user.id,
        username: user.username,
        password: '', // Don't send password back
      },
      message: 'Login successful',
    };

    res.json(response);
  } catch (error) {
    console.error('Login error:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Internal server error',
    };
    res.status(500).json(response);
  }
};

// Register endpoint
export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Validation failed',
        message: errors.array().map(e => e.msg).join(', '),
      };
      return res.status(400).json(response);
    }

    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await userService.getUserByUsername(username);
    if (existingUser) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Username already exists',
      };
      return res.status(409).json(response);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = await userService.createUser({
      username,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    const response: UserApiResponse = {
      success: true,
      data: {
        id: newUser.id,
        username: newUser.username,
        password: '', // Don't send password back
      },
      message: 'Registration successful',
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Registration error:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Internal server error',
    };
    res.status(500).json(response);
  }
};

// Logout endpoint (client-side token removal)
export const logout = async (req: Request, res: Response) => {
  const response: ApiResponse<null> = {
    success: true,
    message: 'Logout successful',
  };
  res.json(response);
};