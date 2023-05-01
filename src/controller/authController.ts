import { NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import { ResponseServer } from '../utils/types';
import bcrypt from 'bcrypt';
import { STATUS_CODE } from '../utils/constants/enums';
import path from 'path';

type User = { username: string; password: string };

const usersDB = {
  users: [{ username: '', password: '' }],
};

const ac = process.env.ACCESS_TOKEN_SECRET || '';
const ref = process.env.REFRESH_TOKEN_SECRET || '';

export const handleLogin = async (
  req: Request,
  res: ResponseServer,
  next: NextFunction
) => {
  try {
    const { user, pwd } = req.body;
    usersDB.users = await getUsers();
    // if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    const foundUser = usersDB.users.find((person) => person.username === user);
    if (!foundUser) return res.sendStatus(401); //Unauthorized
    // // evaluate password
    // const match = await bcrypt.compare(pwd, foundUser.password);
    const match = foundUser.password === pwd;
    if (match) {
      const accessToken = jwt.sign(
        {
          username: foundUser.username,
        },
        ac,
        { expiresIn: '30s' }
      );
      const refreshToken = jwt.sign(
        {
          username: foundUser.username,
        },
        ref,
        { expiresIn: '1d' }
      );

      const otherUsers = usersDB.users.filter(
        (user) => user.username !== foundUser.username
      );
      const currentUser = { ...foundUser, refreshToken };
      await saveUsers([...otherUsers, currentUser]);
      res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
      res.json({
        status: STATUS_CODE.OK,
        message: `User ${user} is logged in!`,
        data: {accessToken}
      });
    } else {
      res.send({
        status: STATUS_CODE.UNAUTHORIZED,
        message: 'User unauthorized',
      });
    }
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
