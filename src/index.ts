import 'reflect-metadata';
import express from 'express';
import connectionDB from './database/connection';
import dotenv from 'dotenv';
import routes from './routes/routes';
import './config/dependency_injection';

dotenv.config();

const app = express();
const PORT= process.env.PORT;

app.use(express.json());
app.use(routes);

connectionDB;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
