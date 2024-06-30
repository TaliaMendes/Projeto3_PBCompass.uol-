import express from 'express';
import carRouter from './Cars.routes';

const routes = express.Router();

routes.use('/api/v1/', carRouter);

export default routes;
