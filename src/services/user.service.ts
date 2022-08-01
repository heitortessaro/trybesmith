import connection from '../models/connection';
import UserModel from '../models/user.model';
import User from '../interfaces/user.interface';
import { createToken } from './jwt.service';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async create(user: User): Promise< string> {
    const { username, id } = await this.model.create(user);
    const token = createToken({ username, id });
    return token;
  }
}

export default UserService;