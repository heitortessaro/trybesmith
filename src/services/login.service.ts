import CreateToken from '../interfaces/createToken.interface';
import { createToken } from './jwt.service';

class LoginService {
  static login(userInfo:CreateToken):string {
    const token = createToken(userInfo);
    return token;
  }
}

export default LoginService;
