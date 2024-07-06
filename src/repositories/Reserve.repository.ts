import { IReservation } from 'interfaces/Reservation.interface';
import Reservation from '../models/Reservation';
import { IReserveRepository } from '../repositories.interface/Reserve.repositories.interface';

class ReserveRepository implements IReserveRepository {
  private repositoryReserve = Reservation;

  async listAllReserve(filters: Partial<IReservation>) {
    const reserve =  await this.repositoryReserve.find(filters);
    return reserve;
  }

  async getReserveById(_id: string) {
    const reserveById = await this.repositoryReserve.findById(_id);
    return reserveById;
  }

  async createReserve(ReserveData: IReservation) {
    const createReserve = await this.repositoryReserve.create(ReserveData);
    return createReserve;
  }

  async updateReserve(reserveId: string, reserveData: IReservation) {
    const updatedReserve = await this.repositoryReserve.findByIdAndUpdate(
      reserveId,
      reserveData,
      { new: true }
    ).populate('id_car').populate('id_user');
    
    return updatedReserve;
  }

  async removeReserve(_id: string) {
    await this.repositoryReserve.deleteOne({ _id: _id});
  }

  async findConflictingReserves(carId: string, userId: string, startDate: string, endDate: string) {
    return this.repositoryReserve.find({
      $or: [
        { id_car: carId, start_date: { $lte: endDate }, end_date: { $gte: startDate } },
        { id_user: userId, start_date: { $lte: endDate }, end_date: { $gte: startDate } }
      ]
    });
  }
}

export default ReserveRepository;