import ReserveController from '../controllers/Reserve.controller';
import express from 'express';
import { container } from 'tsyringe';
import validateObjectId from '../middlewares/Validate.objectId.middewares';
import validateReserve from '../middlewares/Reserve.middlewares';
import { checkToken } from '../middlewares/Authenticate.middlewares';

const routes = express.Router();
const reserveController = container.resolve(ReserveController);

routes.get('/reserve', checkToken, reserveController.listAllReserves.bind(reserveController));
routes.get('/reserve/:_id', checkToken, validateObjectId, reserveController.getReserveById.bind(reserveController));
routes.post('/reserve', checkToken, validateReserve, reserveController.createReserve.bind(reserveController));
routes.put('/reserve/:_id', checkToken, validateObjectId, validateReserve, reserveController.updateReserve.bind(reserveController));
routes.delete('/reserve/:_id', checkToken, validateObjectId, reserveController.removeReserve.bind(reserveController));



export default routes;