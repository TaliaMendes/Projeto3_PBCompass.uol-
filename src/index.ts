import express from 'express';
import connectionDB from './database/connection';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT= process.env.PORT;

app.use(express.json());

connectionDB;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;