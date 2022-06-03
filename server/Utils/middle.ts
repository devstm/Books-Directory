
import { NextFunction, Response, Request } from 'express';
import { CustomError } from './errors';
import { Error } from './Types';
const errorMiddleware = (err:Error, next: NextFunction) => {
  if (err.name === 'ValidationError') {
    next(new CustomError(err.message, 400));
} else {
    next(err);
  }
};
export { errorMiddleware };
