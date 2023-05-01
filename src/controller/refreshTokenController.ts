import { NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import { ResponseServer } from '../utils/types';
import { STATUS_CODE } from '../utils/constants/enums';
import path from 'path';

type User = { username: string; password: string; refreshToken: string };

const usersDB = {
  users: [{ username: '', password: '', refreshToken: '' }],
};

const ac = process.env.ACCESS_TOKEN_SECRET || '';
const ref = process.env.REFRESH_TOKEN_SECRET || '';

export const handleRefreshToken = async (
  req: Request,
  res: ResponseServer,
  next: NextFunction
) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      return res.send({
        status: STATUS_CODE.UNAUTHORIZED,
        message: 'Refresh token is not allowed',
      });
    }
    const refreshToken = cookies.jwt;

    
    usersDB.users = await getUsers();
    
    const foundUser = usersDB.users.find(
      (person) => person.refreshToken === refreshToken
    );

    if (!foundUser) return res.sendStatus(STATUS_CODE.FORBIDDEN); //Unauthorized
    // // evaluate jwt

    const isTokenNotVerify = verifyRefreshToken(
      refreshToken,
      foundUser.username
    );
    if (isTokenNotVerify) {
      return res.send({
        status: STATUS_CODE.FORBIDDEN,
        message: 'Refresh token is not valid',
      });
    }

    const accessToken = jwt.sign({ username: foundUser.username }, ac, {
      expiresIn: '30s',
    });

    res.json({
      status: STATUS_CODE.OK,
      message: 'Access token updated',
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
};

async function getUsers(): Promise<Array<User>> {
  const users = await fs.readFile(
    path.resolve(__dirname, '..', 'model', 'users.json'),
    { encoding: 'utf-8' }
  );
  return JSON.parse(users);
}

async function saveUsers(users: Array<User>) {
  await fs.writeFile(
    path.resolve(__dirname, '..', 'model', 'users.json'),
    JSON.stringify(users)
  );
}

function verifyRefreshToken(refreshToken: string, username: string) {
  let isVerify = false;
  jwt.verify(
    refreshToken,
    ref,
    (err, decoded) => {
      if (
        err ||
        (decoded &&
          typeof decoded !== 'string' &&
          username !== decoded.username)
      ) {
        isVerify = true;
      }
    }
  );
  return isVerify;
}
