import { Request, Response } from 'express';
import UserService from '../services/User.service';
import { container } from 'tsyringe';
import { IUser } from 'interfaces/Users.interface';
import User from '../models/User';
import { paginateModel } from '../utils/Pagination';
import { IPagination } from '../interfaces/Pagination.interface';
import createError from 'http-errors';
import { errors } from '../utils/Errors';

class UserController {

  async listAllUsers(req: Request, res: Response) {
    try {
      const {...filters } = req.query;
      const page = parseInt(req.query.page as string ) || 1;
      const limit = parseInt(req.query.limit as string ) || 10;
      const service = container.resolve(UserService);
      const allUser = await service.listAllUsers(filters as Partial<IUser>);
      
      const result: IPagination<IUser> = await paginateModel<IUser>(
        User,  
        filters,  
        allUser.length,
        limit,    
        page      
      ); 
      res.status(200).json({
        data: result.data,                 // Dados da página atual
        total: result.total,               // Total de registros que correspondem aos filtros
        limit: limit,                      // Limite de registros por página
        offset: page ,                     // Offset da página atual
        offsets: result.offsets            // Número de páginas restantes após a página atual
      });
    } catch (error) {
      return res.status(500).json(errors.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const service = container.resolve(UserService);
      const listUserById = await service.getUserById(req.params._id);
      return res.status(200).json(listUserById);
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(error: any) {
      if (error instanceof createError.NotFound) {
        return res.status(404).json(errors.NOT_FOUND(error.message));
      } else {
        return res.status(500).json(errors.INTERNAL_SERVER_ERROR);
      }
    } 
  }

  async createUser(req: Request, res: Response){
    try{
      const { ...userData } = req.body; 
      const service = container.resolve(UserService);
      const newUser = await service.createUser(userData);
      return res.status(201).json(newUser);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof createError.BadRequest) {
        return res.status(400).json(errors.BAD_REQUEST(error.message));
      } else {
        return res.status(500).json(errors.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const dataUser = req.body;
      const service = container.resolve(UserService);
      const updateUser = await service.updateUser(req.params._id, dataUser);
      return res.status(200).json(updateUser);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(error: any) {
      if (error instanceof createError.NotFound) {
        return res.status(404).json(errors.NOT_FOUND(error.message));
      } else {
        return res.status(500).json(errors.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async removeUser(req: Request, res: Response) {
    try {
      const service = container.resolve(UserService);
      await service.removeUser(req.params._id);
      return res.status(204).json({code: 204, message: 'User removed successfully'});
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

export default UserController;
