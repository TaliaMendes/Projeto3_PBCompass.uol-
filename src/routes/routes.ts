import express from 'express';
import carRouter from './Car.routes';

const routes = express.Router();

routes.use('/api/v1/', carRouter);

export default routes;
