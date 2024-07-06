import { container } from 'tsyringe';
import { ICarRepository } from '../repositories.interface/Car.repositories.interface';
import { IUserRepository } from '../repositories.interface/User.repositories.interface';
import CarRepository from '../repositories/Car.repository';
import UserRepository from '../repositories/User.repository';
import { IReserveRepository } from '../repositories.interface/Reserve.repositories.interface';
import ReserveRepository from '../repositories/Reserve.repository';

container.registerSingleton<ICarRepository>(
  'CarRepository',
  CarRepository,
);

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository,
);

container.registerSingleton<IReserveRepository>(
  'ReserveRepository',
  ReserveRepository,
);