import ReserveController from '../controllers/Reserve.controller';
import express from 'express';
import { container } from 'tsyringe';
import validateObjectId from '../middlewares/Validate.objectId.middewares';
import validateReserve from '../middlewares/Reserve.middlewares';

const routes = express.Router();
const reserveController = container.resolve(ReserveController);

routes.get('/reserve', reserveController.listAllReserves.bind(reserveController));
routes.get('/reserve/:_id', validateObjectId, reserveController.getReserveById.bind(reserveController));
routes.post('/reserve', validateReserve, reserveController.createReserve.bind(reserveController));
routes.put('/reserve/:_id', validateObjectId, validateReserve, reserveController.updateReserve.bind(reserveController));
routes.delete('/reserve/:_id', validateObjectId, reserveController.removeReserve.bind(reserveController));



export default routes;