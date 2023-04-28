import { NextFunction, Request, Response } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const time = Date.now();
  req.time = time;
  next();
};
