import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import validateLogin from '../middleware/authentication.middleware';

const router = Router();

const loginController = new LoginController();

router.post('/login', validateLogin, loginController.login);

export default router;