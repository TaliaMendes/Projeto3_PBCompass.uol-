import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ICar } from '../interfaces/Car.interface';
import { IPagination } from '../interfaces/Pagination.interface';
import Car from '../models/Car';
import CarService from '../services/Cars.service';
import { paginateModel } from '../utils/Pagination';
import { isValidObjectId } from 'mongoose';
import createError from 'http-errors';

class CarsController {
  async listAllCars(req: Request, res: Response) {
    try {
      const {...filters } = req.query;
      const page = parseInt(req.query.page as string ) || 1;
      const limit = parseInt(req.query.limit as string ) || 3;
      const service = container.resolve(CarService);
      await service.listAllCars(filters as Partial<ICar>);
      
      const result: IPagination<ICar> = await paginateModel<ICar>(
        Car,
        filters,
        page,
        limit
      );
      res.status(200).json({
        data: result.data,
        total: result.total,
        limit: limit,
        offset: (page - 1) * limit,
        offsets: result.data.length,
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        status: 'Internal Server Error',
        message: 'Ocorreu um erro inesperado.'
      });
    }
  }

  async getCarById(req: Request, res: Response) {
    try {
      if (!isValidObjectId(req.params._id)) {
        return res.status(400).json({ 
          code: 400, 
          status: 'Bad Request',
          message: 'Invalid ID format' 
        });
      }

      const service = container.resolve(CarService);
      const listCarById = await service.getCarById(req.params._id);
      return res.status(200).json(listCarById);
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(error: any) {
      if (error instanceof createError.NotFound) {
        return res.status(404).json({
            code: 404,
            status: 'Not Found',
            message: error.message,
        });
      } else {
        return res.status(500).json({
          code: 500,
          status: 'Internal Server Error',
          message: 'Ocorreu um erro inesperado.'
        });
      }
    } 
  }

  async createCar(req: Request, res: Response) {
    try {
      const DataCar = req.body;
      const service = container.resolve(CarService);
      const cars = await service.createCar(DataCar);
      return res.status(201).json(cars);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        status: 'Internal Server Error',
        message: 'Ocorreu um erro inesperado.'
      });
    }
  }

  async updateCar(req: Request, res: Response) {
    try {
      if (!isValidObjectId(req.params._id)) {
        return res.status(400).json({ 
          code: 400, 
          status: 'Bad Request',
          message: 'Invalid ID format' 
        });
      }

      const dataCar = req.body;
      const service = container.resolve(CarService);
      const updateCar = await service.updateCar(req.params._id, dataCar);
      return res.status(200).json(updateCar);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(error: any) {
      if (error instanceof createError.NotFound) {
        return res.status(404).json({
            code: 404,
            status: 'Not Found',
            message: error.message,
        });
      } else {
        return res.status(500).json({
          code: 500,
          status: 'Internal Server Error',
          message: 'Ocorreu um erro inesperado.',
          details: error.details
        });
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
        return res.status(404).json({
            code: 404,
            status: 'Not Found',
            message: error.message,
        });
      } else {
        return res.status(500).json({
          code: 500,
          status: 'Internal Server Error',
          message: 'Ocorreu um erro inesperado.',
          details: error.details
        });
      }
    }
  }

  async removeCar(req: Request, res: Response) {
    try {
      if (!isValidObjectId(req.params._id)) {
        return res.status(400).json({ 
          code: 400, 
          status: 'Bad Request',
          message: 'Invalid ID format' 
        });
      }

      const service = container.resolve(CarService);
      await service.removeCar(req.params._id);
      return res.status(204).json({code: 204, message: 'Car removed successfully'});
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof createError.NotFound) {
        return res.status(404).json({
            code: 404,
            status: 'Not Found',
            message: error.message,
        });
      } else {
        return res.status(500).json({
          code: 500,
          status: 'Internal Server Error',
          message: 'Ocorreu um erro inesperado.',
          details: error.details
      });
      }
    }
  }
}

export default CarsController;
