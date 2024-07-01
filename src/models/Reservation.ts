import mongoose from 'mongoose';
import { IReservation } from '../interfaces/Reservation.interface';
const { Schema } = mongoose;

const ReservationSchema = new Schema<IReservation>({
  id_user: { type: String, required: true },
  start_date: { type: String, required: true },
  end_date: { type: String, required: true },
  id_car: { type: String, required: true },
  final_value: { type: String, required: true }
});

const Reservation = mongoose.model<IReservation>('Car', ReservationSchema);

export default Reservation;