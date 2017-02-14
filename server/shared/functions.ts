import { Response } from 'express';

export function sendError(error, response: Response) {
  const {code, errorNum, message, name} = error;
  response
    .status(code)
    .json({ errorNum, message, name });
}
