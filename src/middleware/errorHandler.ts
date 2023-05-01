import { NextFunction, Request } from 'express';
import { STATUS_CODE } from 'src/utils/constants/enums';
import { ResponseServer } from 'src/utils/types';
import { logEvents } from '../utils/logs/logEvents';

export const errorHandler = (
  err: Error,
  req: Request,
  res: ResponseServer,
  next: NextFunction
) => {
  logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
  console.error(err.stack);
  res
    .status(STATUS_CODE.INTERNAL_ERROR)
    .send({ status: STATUS_CODE.INTERNAL_ERROR, message: err.message });
};
