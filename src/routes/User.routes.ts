import express from 'express';
import { container } from 'tsyringe';
import UserController from '../controllers/User.controller';
import validateUSer from '../middlewares/User.middlewares';
import validateObjectId from '../middlewares/Validate.objectId.middewares';

const routes = express.Router();
const userController = container.resolve(UserController);

routes.get('/user', userController.listAllUsers.bind(userController));
routes.get('/user/:_id', validateObjectId, userController.getUserById.bind(userController));
routes.post('/user', validateUSer, userController.createUser.bind(UserController));
routes.put('/user/:_id', validateUSer, validateObjectId, userController.updateUser.bind(userController));
routes.delete('/user/:_id', validateObjectId, userController.removeUser.bind(userController));

export default routes;
