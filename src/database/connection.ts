import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connection = mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('Connected database'))
  .catch(err => console.error('Unable to connect to database', err));

export default connection;