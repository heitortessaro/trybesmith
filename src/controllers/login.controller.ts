import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
// import { createToken } from '../services/jwt.service';
import LoginService from '../services/login.service';
import { RequestWithBody, User } from '../types/reqWithBody.type';
// import validateLogin from '../middleware/authentication.middleware';

class LoginController {
  // constructor(private loginService = new LoginService()) {}

  public login = (req:RequestWithBody, res:Response) => {
    const { user } = req;
    const token = LoginService.login(user as User); 
    res.status(StatusCodes.OK).json({ token });
  };
}

export default LoginController;