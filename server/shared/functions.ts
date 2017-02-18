import { Response } from 'express';

interface KnownError {
  name: string;
  statusCode?: number;
  message: string;
};

export function sendError(error: KnownError, response: Response) {
  response
    .status(error.statusCode || 500)
    .json({
      name: error.name,
      message: error.message
    });
}
