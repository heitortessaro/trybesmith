import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/user.service';

class UserController {
  constructor(private userService = new UserService()) {}

  public create = async (req: Request, res: Response) => {
    const user = req.body;
    const token = await this.userService.create(user);
    console.log(token);
    res.status(StatusCodes.CREATED).json({ token });
  };
}

export default UserController;