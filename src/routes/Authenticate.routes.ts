import express from 'express';
import AuthController from '../controllers/Authenticate.controller';
import { container } from 'tsyringe';

const routes = express.Router();
const authController = container.resolve(AuthController);;

routes.post('/authenticate',  authController.authenticate.bind(authController));

export default routes;
