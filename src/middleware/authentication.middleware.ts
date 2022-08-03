import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import createError from '../helpers/createError';
import Login from '../interfaces/login.interface';

import connection from '../models/connection';
import UserModel from '../models/user.model';

type User = {
  username: string,
  id: number,
};

type RequestWithBody = Request & {
  user: User,
};

// Depois refatorar e incluir a extensão de Request como classe
// class RequestWithBody extends Request { 
//   user: User;

//   constructor(user: User) {
//     super();
//     this.user = user; 
//   } 
// }

const validateLoginProperties = async (loginInfo:Login):Promise<void> => {
  const schema = Joi.object({
    username: Joi.string().min(1).required(),
    password: Joi.string().min(1).required(),
  });
  const { error } = await schema.validateAsync(loginInfo);
  if (error) throw error;
};

const validateLogin = async (req: RequestWithBody, _res:Response, next:NextFunction) => {
  const { username, password } = req.body;
  await validateLoginProperties({ username, password });
  const model = new UserModel(connection);
  const user = await model.getUserByUsername(username);
  if (user.password !== password) {
    createError(StatusCodes.UNAUTHORIZED, 'Username or password invalid');
  }
  const { id } = user;
  req.user = { username, id: id as number };
  next();
};

export default validateLogin;