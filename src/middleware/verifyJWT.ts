import { NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import { STATUS_CODE } from 'src/utils/constants/enums';
import { ResponseServer } from 'src/utils/types';

export const verifyJWT = (
  req: Request,
  res: ResponseServer,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.send({
      status: STATUS_CODE.UNAUTHORIZED,
      message: 'User unauthorized',
    });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!, (err, decoded) => {
    if (err) {
      return res.send({
        status: STATUS_CODE.FORBIDDEN,
        message: 'token expired',
      });
    }
    if(decoded && typeof decoded !== 'string')
    req.user = decoded.username;
    next();
  });
};
