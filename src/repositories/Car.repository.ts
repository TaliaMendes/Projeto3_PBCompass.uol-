import { ICarRepository } from '../repositories.interface/Car.repositories.interface';
import Car from '../models/Car';
import { ICar } from '../interfaces/Car.interface';
import  mongoose from 'mongoose';


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

  async addAccessory(carId: string, accessory: { description: string }) {
    
    const newAccessory = {
      _id: new mongoose.Types.ObjectId(), 
      description: accessory.description
    };
    
    const car = await this.repositoryCar.findByIdAndUpdate(
      carId,
      { $push: { accessories: newAccessory } },
      { new: true }
    );
    return car;
  }

  async modifyAccessory(carId: string, accessoryId: string, description: string) {
    let car;
    const existingAccessory = await this.repositoryCar.findOne({ _id: carId, 'accessories._id': accessoryId });

    if (existingAccessory) {
      car = await this.updateAccessory(carId, accessoryId, description);
    } else {
      car = await this.addAccessory(carId, { description });
    }
    return car;
  }
  
  async removeCar(_id: string) {
    await this.repositoryCar.deleteOne({ _id: _id});
  }
}

export default CarRepository;
