import { HttpError } from '../errors/http-error';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    console.error('Error details:', err);
    console.error('Error stack:', err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};
