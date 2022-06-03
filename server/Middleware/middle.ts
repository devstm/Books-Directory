
import { NextFunction, Response, Request } from 'express';
import { CustomError } from '../Utils/Errors/custumError';
import { Error } from '../Utils/Types';
const errorMiddleware = (err:Error, next: NextFunction) => {
  console.log(err);  
  if (err.name === 'ValidationError') {
    next(new CustomError(err.message, 400));
} else {
    next(err);
  }
};
export { errorMiddleware };
