import { Request, Response, NextFunction } from 'express';

interface error {
  status: number;
  message: string
}

const serverError = (err: error, req: Request, res: Response, next: NextFunction) => {
  if (err.status) {
    res.status(err.status).json({ msg: err.message });
  } else {
    res.status(500).json({ message: 'Server Error' });
  }
};

export default serverError;