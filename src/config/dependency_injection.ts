import { container } from 'tsyringe';
import { ICarRepository } from '../repositories.interface/Car.repositories.interface';
import CarRepository from '../repositories/Car.repository';


container.registerSingleton<ICarRepository>(
  'CarRepository',
  CarRepository,
);
