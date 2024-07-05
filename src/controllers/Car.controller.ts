import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ICar } from '../interfaces/Car.interface';
import { IPagination } from '../interfaces/Pagination.interface';
import Car from '../models/Car';
import CarService from '../services/Cars.service';
import { paginateModel } from '../utils/Pagination';
import createError from 'http-errors';
import { errors } from '../utils/Errors';

class CarsController {
  async listAllCars(req: Request, res: Response) {
    try {
      const {...filters } = req.query;
      const page = parseInt(req.query.page as string, 10 ) || 1;
      const limit = parseInt(req.query.limit as string, 10 ) || 5;
      const service = container.resolve(CarService);
      const allCars = await service.listAllCars(filters as Partial<ICar>);
      
      const result: IPagination<ICar> = await paginateModel<ICar>(
        Car,  
        filters,  
        allCars.length,
        limit,    
        page      
      ); 
      res.status(200).json({
        data: result.data,                 // Dados da página atual
        total: result.total,               // Total de registros que correspondem aos filtros
        limit: limit,                      // Limite de registros por página
        offset: page,                      // Offset da página atual
        offsets: result.offsets            // Número de páginas restantes após a página atual
      });
    } catch (error) {
      return res.status(500).json(errors.INTERNAL_SERVER_ERROR);
    }
  }

  async getCarById(req: Request, res: Response) {
    try {
      const service = container.resolve(CarService);
      const listCarById = await service.getCarById(req.params._id);
      return res.status(200).json(listCarById);
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(error: any) {
      if (error instanceof createError.NotFound) {
        return res.status(404).json(errors.NOT_FOUND(error.message));
      } else {
        return res.status(500).json(errors.INTERNAL_SERVER_ERROR);
      }
    } 
  }

  async createCar(req: Request, res: Response) {
    try {
      const DataCar = req.body;
      const service = container.resolve(CarService);
      const cars = await service.createCar(DataCar);
      return res.status(201).json(cars);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return res.status(500).json(errors.INTERNAL_SERVER_ERROR);
    }
  }

  async updateCar(req: Request, res: Response) {
    try {
      const dataCar = req.body;
      const service = container.resolve(CarService);
      const updateCar = await service.updateCar(req.params._id, dataCar);
      return res.status(200).json(updateCar);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(error: any) {
      if (error instanceof createError.NotFound) {
        return res.status(404).json(errors.NOT_FOUND(error.message));
      } else {
        return res.status(500).json(errors.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async updateAccessory(req: Request, res: Response): Promise<Response> {
    try {
      const { _id: carId, accessoryId } = req.params;
      const { description } = req.body;
      const service = container.resolve(CarService);
      const car = await service.updateAccessory(carId, accessoryId, description);
      return res.status(200).json(car);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof createError.NotFound) {
        return res.status(404).json(errors.NOT_FOUND(error.message));
      } else {
        return res.status(500).json(errors.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async removeCar(req: Request, res: Response) {
    try {
      const service = container.resolve(CarService);
      await service.removeCar(req.params._id);
      return res.status(204).json({code: 204, message: 'Car removed successfully'});
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof createError.NotFound) {
        return res.status(404).json(errors.NOT_FOUND(error.message));
      } else {
        return res.status(500).json(errors.INTERNAL_SERVER_ERROR);
      }
    }
  }
}

export default CarsController;
