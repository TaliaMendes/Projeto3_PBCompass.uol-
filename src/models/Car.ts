import mongoose from 'mongoose';
const { Schema } = mongoose;
import { ICar } from '../interfaces/Car.interface';
import { IAccessory } from '../interfaces/Accessory.interface';

const Accessory = new Schema<IAccessory>({
  description: { type: String, required: true }
});

const CarSchema = new Schema<ICar>({
  model: { type: String, required: true },
  color: { type: String, required: true },
  year: { type: String, required: true},
  value_per_day: { type: Number, required: true },
  accessories: { type: [Accessory], required: true },
  number_of_passengers: { type: Number, required: true }
});

const Car = mongoose.model<ICar>('Car', CarSchema);

export default Car;