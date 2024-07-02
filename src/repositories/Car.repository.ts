import { ICarRepository } from '../repositories.interface/Car.repositories.interface';
import Car from '../models/Car';
import { ICar } from '../interfaces/Car.interface';


class CarRepository implements ICarRepository {
  private repositoryCar = Car;

  async listAllCars(filters: Partial<ICar>) {
    const query = this.repositoryCar.find(filters);
    const cars = await query;
    return cars;
  }

  async getCarById(_id: string) {
    const carById = await this.repositoryCar.findById(_id);
    return carById;
  }

  async createCar(CarData: ICar) {
    const createCar = await this.repositoryCar.create(CarData);
    return createCar;
  }

  async updateCar(_id: string, CarData: ICar) {
    const updateCar = await this.repositoryCar.findByIdAndUpdate(_id, CarData);
    return updateCar;
  }

  async updateAccessory(carId: string, accessoryId: string, description: string){ 
    const car = await this.repositoryCar.findOneAndUpdate(
        { _id: carId, 'accessories._id': accessoryId },
        { $set: { 'accessories.$.description': description } },
        { new: true }
    );
    
    return car;
  } 

  async addAccessory(carId: string, accessory: { description: string }): Promise<ICar | null> {
    const car = await this.repositoryCar.findByIdAndUpdate(
      carId,
      { $push: { accessories: accessory } },
      { new: true }
    );
    return car;
  }

  async removeCar(_id: string) {
    await this.repositoryCar.deleteOne({ _id: _id});
  }
}

export default CarRepository;
