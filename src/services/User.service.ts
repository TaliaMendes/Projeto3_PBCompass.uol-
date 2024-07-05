import { inject, injectable } from 'tsyringe'; 
import { IUserRepository } from '../repositories.interface/User.repositories.interface';
import { IUser } from '../interfaces/Users.interface';
import getAddressByCep from './ViaCep.service';
import createError from 'http-errors';
 
@injectable()
class UserService {
  constructor (
    @inject('UserRepository')
    private UserRepository: IUserRepository,
  ){}

  async listAllUsers(filters: Partial<IUser>) {
    const listAllUser = await this.UserRepository.listAllUsers(filters);
    return listAllUser;
  }

  async getUserById(_id: string) {
    const listUserById = await this.UserRepository.getUserById(_id);
    if (!listUserById) {
      throw new createError.NotFound('Id not found');
    } else{
      return listUserById;
    }
  }

  async createUser(userData: IUser) {
    const cpfExist = await this.UserRepository.getUserByCpf(userData.cpf);
    const emailExist = await this.UserRepository.getUserByEmail(userData.email);
    if (cpfExist || emailExist){
      throw new createError.BadRequest('Email or CPF already registered');
    }
      const dataCep = await getAddressByCep(userData.cep);
      const newUser = await this.UserRepository.createUser(dataCep, userData);
      return newUser;
    
  }

  async updateUser(_id: string, userData: IUser) {
    const userExists = await this.UserRepository.getUserById(_id);
    if (!userExists) {
      throw new createError.NotFound('Id not found');
    }
    const updateUser = await this.UserRepository.updateUser( _id, userData );
    return updateUser;
  }
   
  async removeUser(_id: string) {
    const userExists = await this.UserRepository.getUserById(_id);
    if (!userExists) {
      throw new createError.NotFound('Id not found');
    }
    await this.UserRepository.removeUser(_id);
  }
}

export default UserService;
