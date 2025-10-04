import { Request, Response } from 'express';
import { UserService } from '../services/userService.js';
import { ApiResponse, UserApiResponse } from '@climatesight/shared';

const userService = new UserService();

// Get user profile
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    
    if (!userId) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'User not authenticated',
      };
      return res.status(401).json(response);
    }

    const user = await userService.getUser(userId);
    if (!user) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'User not found',
      };
      return res.status(404).json(response);
    }

    const response: UserApiResponse = {
      success: true,
      data: {
        id: user.id,
        username: user.username,
        password: '', // Don't send password back
      },
    };

    res.json(response);
  } catch (error) {
    console.error('Get user profile error:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch user profile',
    };
    res.status(500).json(response);
  }
};

// Update user profile
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { username } = req.body;

    if (!userId) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'User not authenticated',
      };
      return res.status(401).json(response);
    }

    // Check if username is already taken by another user
    if (username) {
      const existingUser = await userService.getUserByUsername(username);
      if (existingUser && existingUser.id !== userId) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Username already taken',
        };
        return res.status(409).json(response);
      }
    }

    const updatedUser = await userService.updateUser(userId, { username });

    const response: UserApiResponse = {
      success: true,
      data: {
        id: updatedUser.id,
        username: updatedUser.username,
        password: '', // Don't send password back
      },
      message: 'Profile updated successfully',
    };

    res.json(response);
  } catch (error) {
    console.error('Update user profile error:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to update user profile',
    };
    res.status(500).json(response);
  }
};

// Delete user account
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'User not authenticated',
      };
      return res.status(401).json(response);
    }

    await userService.deleteUser(userId);

    const response: ApiResponse<null> = {
      success: true,
      message: 'Account deleted successfully',
    };

    res.json(response);
  } catch (error) {
    console.error('Delete user error:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to delete account',
    };
    res.status(500).json(response);
  }
};