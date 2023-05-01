import { NextFunction, Request } from 'express';
import { ResponseServer } from '../utils/types';
import { users } from '../model/users';
import bcrypt from 'bcrypt';
import { STATUS_CODE } from '../utils/constants/enums';

const usersDB = {
  users,
  // setUsers: function (data) { this.users = data }
};

export const handleLogin = async (req: Request, res: ResponseServer, next: NextFunction) => {
  try {
    const { user, pwd } = req.body;
  // if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
  const foundUser = usersDB.users.find(person => person.username === user);
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // // evaluate password
  // const match = await bcrypt.compare(pwd, foundUser.password);
  const match = foundUser.password === pwd;
  if (match) {
      res.json({status: STATUS_CODE.OK, message: `User ${user} is logged in!` });
  } else {
      throw new Error('Error auth')
      res.send({status: STATUS_CODE.UNAUTHORIZED, message: 'User unauthorized'});
  }
  } catch(error) {
    next(error)
  }
  
};

