import { Response } from 'express';

export function sendError(error, response: Response) {
  const {code = 500, errorNum, message = error, name} = error;
  response
    .status(code)
    .json({ errorNum, message, name });
}
