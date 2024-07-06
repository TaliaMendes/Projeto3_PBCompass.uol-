import mongoose from 'mongoose';
import { IReservation } from '../interfaces/Reservation.interface';
const { Schema } = mongoose;

const ReservationSchema = new Schema<IReservation>({
  id_user: { type: String, required: true, ref: 'User' },
  start_date: { type: String, required: true },
  end_date: { type: String, required: true },
  id_car: { type: String, required: true, ref: 'Car' },
  final_value: { type: Number, required: true }
});

const Reservation = mongoose.model<IReservation>('Reservation', ReservationSchema);

export default Reservation;
