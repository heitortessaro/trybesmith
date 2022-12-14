import express, { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import 'express-async-errors';
import ProductRoutes from './routes/product.routes';
import UserRoutes from './routes/user.routes';
import OrderRoutes from './routes/order.routes';
import LoginRoutes from './routes/login.routes';
import errorHandler from './middleware/errorHandler.middleware';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ info: 'working' });
});

app.use(ProductRoutes);
app.use(UserRoutes);
app.use(OrderRoutes);
app.use(LoginRoutes);
app.use(errorHandler);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const { name, message, details } = err as any;
  // console.log(`name: ${name}`);

  switch (name) {
    case 'ValidationError':
      res.status(400).json({ message: details[0].message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    case 'ConflictError':
      res.status(409).json({ message });
      break;
    default:
      console.error(err);
      res.sendStatus(500);
  }

  next();
});

export default app;
