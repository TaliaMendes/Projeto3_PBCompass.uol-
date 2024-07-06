import { IReservation } from '../interfaces/Reservation.interface';

export interface IReserveRepository {
  listAllReserve(filters: Partial<IReservation>): Promise<IReservation[]>
  getReserveById(_id: string): Promise<IReservation | null>
  createReserve(ReserveData: IReservation): Promise<IReservation | null>
  updateReserve(_id: string, ReserveData: IReservation): Promise<IReservation | null>
  removeReserve(_id: string): Promise<void>
  findConflictingReserves(carId: string, userId: string, startDate: string, endDate: string): Promise<IReservation[]>
}