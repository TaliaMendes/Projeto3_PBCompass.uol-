import express from 'express';
import CarsController from '../controllers/Car.controller';
import { container } from 'tsyringe';
import validateCar from '../middlewares/Car.middlewares';
import validateObjectId from '../middlewares/Validate.objectId.middewares';

const routes = express.Router();
const carController = container.resolve(CarsController);

routes.get('/car', carController.listAllCars.bind(carController));
routes.get('/car/:_id', validateObjectId, carController.getCarById.bind(carController));
routes.post('/car', validateCar, carController.createCar.bind(carController));
routes.put('/car/:_id', validateObjectId, validateCar, carController.updateCar.bind(carController));
routes.patch('/car/:_id/accessories/:accessoryId?', validateObjectId, carController.updateAccessory.bind(carController));
routes.delete('/car/:_id', validateObjectId, carController.removeCar.bind(carController));

export default routes;
