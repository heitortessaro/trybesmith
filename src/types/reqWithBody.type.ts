import { Request } from 'express';

type User = {
  username: string,
  id: number,
};

type RequestWithBody = Request & {
  user?: User,
};

export { RequestWithBody, User };