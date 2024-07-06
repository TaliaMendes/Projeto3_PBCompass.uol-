import express from 'express';
import carRouter from './Car.routes';
import userRouter from './User.routes';
import authRouter from './Authenticate.routes';
import reserveRouter from './Reserve.routes';
import swaggerDocument from '../Swagger/Swagger.json';
import swaggerUi from 'swagger-ui-express';

const routes = express.Router();

routes.use('/api/v1/', carRouter);
routes.use('/api/v1/', userRouter);
routes.use('/api/v1/', authRouter);
routes.use('/api/v1/', reserveRouter);
routes.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
export default routes;
