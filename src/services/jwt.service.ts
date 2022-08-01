import dotenv from 'dotenv';
import jwt, { SignOptions } from 'jsonwebtoken';
import CreateToken from '../interfaces/createToken.interface';
import createError from '../helpers/createError';

dotenv.config();

export const createToken = (userInfo: CreateToken):string => {
  const options: SignOptions = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const JWT_SECRET = process.env.MY_SECRET || 'senhaFraca';
  const token = jwt.sign(userInfo, JWT_SECRET, options);
  return token;
};

const validateToken = (token:string) => {
  const JWT_SECRET = process.env.MY_SECRET || 'senhaFraca';
  try {
    const decoded = jwt.verify(token, JWT_SECRET); 
    return { 
      username: (<any>decoded).username, 
      id: (<any>decoded).id, 
    };
  } catch (_erro) {
    createError(401, 'Expired or invalid token');
  }
};

export default {
  createToken, 
  validateToken,
};