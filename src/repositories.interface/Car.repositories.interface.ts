import { ICar } from '../interfaces/Car.interface';

export interface ICarRepository {
  listAllCars(filters: Partial<ICar>): Promise<ICar[]>
  getCarById(_id: string):Promise<ICar | null>
  createCar(CarData: ICar):Promise<ICar | null>
  updateCar(_id: string, CarData: ICar):Promise<ICar | null>
  updateAccessory(carId: string, accessoryId: string, description: string): Promise<ICar | null> 
  addAccessory(carId: string, accessory: { description: string }): Promise<ICar | null>
  modifyAccessory(carId: string, accessoryId: string, description: string): Promise<ICar | null> 
  removeCar(_id: string):Promise<void>
};
