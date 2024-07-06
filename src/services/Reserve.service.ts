import { inject, injectable } from 'tsyringe';
import { IReservation } from '../interfaces/Reservation.interface';
import { ICarRepository } from '../repositories.interface/Car.repositories.interface';
import { IUserRepository } from '../repositories.interface/User.repositories.interface';
import ReserveRepository from '../repositories/Reserve.repository';
import createError from 'http-errors';

@injectable()
class CarService {
  constructor(
    @inject('ReserveRepository') private reserveRepository: ReserveRepository,
    @inject('CarRepository') private CarRepository: ICarRepository,
    @inject('UserRepository') private UserRepository: IUserRepository,
  ) {}

  async listAllReserve(filters: Partial<IReservation>) {
    return this.reserveRepository.listAllReserve(filters);
  }

  async getReserveById(reserveId: string): Promise<IReservation> {
    const reserve = await this.reserveRepository.getReserveById(reserveId);
    if (!reserve) {
      throw new createError.NotFound('Reserve not found');
    }
    return reserve;
  }

  async createReserve(reserveData: IReservation) {
    const user = await this.UserRepository.getUserById(reserveData.id_user);
    const car = await this.CarRepository.getCarById(reserveData.id_car);

    if (!user || !car) {
      throw new createError.NotFound('User or Car not found');
    }

    if (user.qualified !== 'sim') {
      throw new createError.BadRequest('The user must have a driver\'s license');
    }

    const conflictingReserves = await this.reserveRepository.findConflictingReserves(
      reserveData.id_car,
      reserveData.id_user,
      reserveData.start_date,
      reserveData.end_date
    );
    
    if (conflictingReserves.length > 0) {
      throw new createError.BadRequest('Conflicting reservation exists');
    }
    
    const startDate = new Date(reserveData.start_date);
    const endDate = new Date(reserveData.end_date);
    const days = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
    const finalValue = car.value_per_day * days;

    const newReserve = {
      ...reserveData,
      final_value: finalValue
    };

    return this.reserveRepository.createReserve(newReserve);
  }

  async updateReserve(reserveId: string, reserveData: IReservation) {
    const reserveExists = await this.reserveRepository.getReserveById(reserveId);
    if (!reserveExists) {
      throw new createError.NotFound('Reserve not found');
    }

    const car = await this.CarRepository.getCarById(reserveData.id_car);
    if (!car) {
      throw new createError.NotFound('Car not found');
    }

    const conflictingReserves = await this.reserveRepository.findConflictingReserves(
      reserveData.id_car,
      reserveData.id_user,
      reserveData.start_date,
      reserveData.end_date
    );


    if (conflictingReserves.length > 0 && conflictingReserves.some(res => res._id.toString() !== reserveId)) {
      throw new createError.BadRequest('Conflicting reservation exists');
    }

    const startDate = new Date(reserveData.start_date);
    const endDate = new Date(reserveData.end_date);
    const days = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
    const finalValue = car.value_per_day * days;

    const updatedReserve = {
      ...reserveData,
      final_value: finalValue
    };
    
    const reservation = await this.reserveRepository.updateReserve(reserveId, updatedReserve);
   
    return reservation;
  }

  async removeReserve(reserveId: string): Promise<void> {
    const reserveExists = await this.reserveRepository.getReserveById(reserveId);
    if (!reserveExists) {
      throw new createError.NotFound('Reserve not found');
    }
    await this.reserveRepository.removeReserve(reserveId);
  }
}

export default CarService;

