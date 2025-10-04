import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ApiResponse } from '@climatesight/shared';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  // Zod validation errors
  if (err instanceof ZodError) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Validation error',
      message: err.errors.map(e => e.message).join(', '),
    };
    return res.status(400).json(response);
  }

  // Custom API errors
  if ('statusCode' in err) {
    const response: ApiResponse<null> = {
      success: false,
      error: err.message || 'An error occurred',
    };
    return res.status((err as any).statusCode).json(response);
  }

  // Default server error
  const response: ApiResponse<null> = {
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  };
  
  res.status(500).json(response);
};

export const notFound = (req: Request, res: Response) => {
  const response: ApiResponse<null> = {
    success: false,
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.path}`,
  };
  res.status(404).json(response);
};