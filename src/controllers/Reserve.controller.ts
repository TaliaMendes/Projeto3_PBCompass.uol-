import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Reservation from '../models/Reservation';
import { IReservation } from '../interfaces/Reservation.interface';
import ReserveService from '../services/Reserve.service';
import { paginateModel } from '../utils/Pagination';
import { IPagination } from '../interfaces/Pagination.interface';
import createError from 'http-errors';
import { errors } from '../utils/Errors';

class ReserveController {
  async listAllReserves(req: Request, res: Response) {
    try {
      const { ...filters } = req.query;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 100;
      const service = container.resolve(ReserveService);
      const allReserves = await service.listAllReserve(filters as Partial<IReservation>);
    
      const result: IPagination<IReservation> = await paginateModel<IReservation>(
        Reservation,  
        filters,  
        allReserves.length,
        limit,    
        page      
      ); 
      res.status(200).json({
        data: result.data,                 
        total: result.total,               
        limit: limit,                      
        offset: page,                    
        offsets: result.offsets 
      });
    } catch (error) {
      return res.status(500).json(errors.INTERNAL_SERVER_ERROR);
    }
  }

  async getReserveById(req: Request, res: Response): Promise<Response> {
    try {
      const reserveId = req.params._id; 
      const service = container.resolve(ReserveService);
      const reserve = await service.getReserveById(reserveId);
      return res.status(200).json(reserve);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof createError.NotFound) {
        return res.status(404).json(errors.NOT_FOUND(error.message));
      } else {
        return res.status(500).json(errors.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async createReserve(req: Request, res: Response): Promise<Response> {
    try {
      const reserveData = req.body;
      const service = container.resolve(ReserveService);
      const reserve = await service.createReserve(reserveData);
      return res.status(201).json(reserve);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof createError.BadRequest) {
        return res.status(400).json(errors.BAD_REQUEST(error.message));
      } else {
        return res.status(500).json(errors.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async updateReserve(req: Request, res: Response): Promise<Response> {
    try {
      const reserveId = req.params._id;
      const reserveData = req.body;
      const service = container.resolve(ReserveService);
      const updatedReserve = await service.updateReserve(reserveId, reserveData);
      console.log(reserveId);
      return res.status(200).json(updatedReserve);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof createError.NotFound) {
        return res.status(404).json(errors.NOT_FOUND(error.message));
      } else {
        console.log(error);
        return res.status(500).json(errors.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async removeReserve(req: Request, res: Response): Promise<Response> {
    try {
      const service = container.resolve(ReserveService);
      await service.removeReserve(req.params._id);
      return res.status(204).json({ message: 'Reserve removed successfully' });
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

export default ReserveController;
