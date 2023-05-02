import { Request, Response, NextFunction } from 'express';
import { STATUS_CODE } from 'src/utils/constants/enums';
import { AnyZodObject, ZodError } from 'zod';

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({
          status: 'fail',
          errors: error.errors,
        });
      }
      next(error);
    }
  };