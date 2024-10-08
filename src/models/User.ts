import { IUser } from '../interfaces/Users.interface';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  birth: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cep: { type: String, required: true },
  patio: { type: String, required: true },
  qualified: { type: String, required: true },
  complement: { type: String },
  neighborhood: { type: String },
  locality: { type: String },
  uf: { type: String }
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
