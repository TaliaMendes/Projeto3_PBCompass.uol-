import { ICarRepository } from '../repositories.interface/Car.repositories.interface';
import { ICar } from '../interfaces/Car.interface';
import { inject, injectable } from 'tsyringe';
import createError from 'http-errors';

@injectable()
class CarService {
  constructor (
    @inject('CarRepository')
    private CarRepository: ICarRepository,
  ){}

  async listAllCars(filters: Partial<ICar>) {
    const listAllCar = await this.CarRepository.listAllCars(filters);
    return listAllCar;
  }

  async getCarById(_id: string) {
    const listCarById = await this.CarRepository.getCarById(_id);
    if (!listCarById) {
      throw new createError.NotFound('Id not found');
    } else{
      return listCarById;
    }
  }

  async createCar(CarData: ICar) {
    const newCar = await this.CarRepository.createCar(CarData);
    return newCar;
  }

  async updateCar(_id: string, CarData: ICar) {
    const carExists = await this.CarRepository.getCarById(_id);
    if (!carExists) {
      throw new createError.NotFound('Id not found');
    }
    const updateCar = await this.CarRepository.updateCar( _id, CarData );
    return updateCar;
  }

  async updateAccessory(carId: string, accessoryId: string, description: string) {
   const car = await this.CarRepository.modifyAccessory(carId,  accessoryId, description);
    if (!car) {
      throw new createError.NotFound('Car not found');
    }
    return car;
  }

  async removeCar(_id: string) {
    const carExists = await this.CarRepository.getCarById(_id);
    if (!carExists) {
      throw new createError.NotFound('Id not found');
    }
    await this.CarRepository.removeCar(_id);
  }
}


export default CarService;