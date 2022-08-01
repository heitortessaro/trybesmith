import { StatusCodes } from 'http-status-codes';
import { Pool, ResultSetHeader } from 'mysql2/promise';
import createError from '../helpers/createError';
// import dotenv from 'dotenv';
// import jwt, { SignOptions } from 'jsonwebtoken';
import User from '../interfaces/user.interface';

// dotenv.config();

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(user: User): Promise<{ username: string, id:number }> {
    const { username, classe, level, password } = user;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
    if (!result) { 
      createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error accessing database.');
    }
    const id = result[0].insertId;
    // const options: SignOptions = {
    //   expiresIn: '1d',
    // };
    // const token = jwt.sign({ username, id }, process.env.MY_SECRET || 'senhaFraca', options);
    // return token;
    return { username, id };
  }
}