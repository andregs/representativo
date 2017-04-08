import { Response } from 'express';
import { ModelError } from './model-error';

export function sendError(error: ModelError, response: Response) {
  response
    .status(error.statusCode || 500)
    .json({
      name: error.name,
      message: error.message || "Internal Server Error",
    });
}
