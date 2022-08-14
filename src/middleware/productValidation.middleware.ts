import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi, { ValidationResult } from 'joi';
import createError from '../helpers/createError';
import Login from '../interfaces/login.interface';
import { RequestWithBody } from '../types/reqWithBody.type';
import connection from '../models/connection';
import UserModel from '../models/user.model';
import Product from '../interfaces/product.interface';

// Depois refatorar e incluir a extensão de Request como classe
// class RequestWithBody extends Request { 
//   user: User;

//   constructor(user: User) {
//     super();
//     this.user = user; 
//   } 
// }

const validateNewProductProperties = async (productInfo:Product):Promise<ValidationResult> => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    amount: Joi.string().min(3).required(),
  });
  const { error, value } = await schema.validateAsync(productInfo);
  if (error) throw error;
  return value;
};

const ValidateNewProduct = async (req: Request, _res:Response, next:NextFunction) => {
  const { name, amount } = req.body;
  await validateNewProductProperties({ name, amount });
  const model = new UserModel(connection);
  const user = await model.getUserByUsername(username);
  if (user.password !== password) {
    createError(StatusCodes.UNAUTHORIZED, 'Username or password invalid');
  }
  const { id } = user;
  req.user = { username, id: id as number };
  next();
};

export default ValidateNewProduct;