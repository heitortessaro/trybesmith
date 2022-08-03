import { StatusCodes } from 'http-status-codes';
import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
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
    return { username, id };
  }

  public async getUserByUsername(username: string): Promise<User> {
    const [result] = await this.connection.execute<RowDataPacket[]>(
      `SELECT * FROM Trybesmith.Users
      WHERE username = ?`,
      [username],
    );
    if (!result[0]) {
      createError(StatusCodes.UNAUTHORIZED, 'Username or password invalid'); 
    }
    const user = result[0];
    return user as User;
  }
}