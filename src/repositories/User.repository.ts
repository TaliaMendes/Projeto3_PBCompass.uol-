import { IUserRepository } from '../repositories.interface/User.repositories.interface';
import User from '../models/User';
import { IUser } from '../interfaces/Users.interface';
import { ICep } from 'interfaces/Cep.interface';
import bcrypt from 'bcrypt';

class UserRepository implements IUserRepository {
  private repositoryUser = User;

  async listAllUsers(filters: Partial<IUser>) {
   const query = this.repositoryUser.find(filters);
   const users = await query;
    return users;
  }

  async getUserById(_id: string) {
    const userById = await this.repositoryUser.findById(_id);
    return userById;
  }

  async getUserByEmail(email: string) {
    const userByEmail = await this.repositoryUser.findOne({ email });
    return userByEmail;
  }
  async getUserByCpf(cpf: string){
    const userByCpf = await this.repositoryUser.findOne({ cpf });
    return userByCpf;
  }

  async createUser(dataCep: ICep, userData: IUser){

    const hashedPassword = await bcrypt.hash(userData.password, 8);

    const userWithAddress = {
      ...userData,
      password: hashedPassword,
      patio: dataCep.patio,
      complement: dataCep.complement,
      neighborhood: dataCep.neighborhood,
      locality: dataCep.locality,
      uf: dataCep.uf, 
    };
    
    const createUser = await this.repositoryUser.create(userWithAddress);
    return createUser;
  }

  async updateUser(_id: string, userData: IUser) {
    const updateUser = await this.repositoryUser.findByIdAndUpdate(_id, userData);
    return updateUser;
  }

  async removeUser(_id: string) {
    await this.repositoryUser.deleteOne({ _id: _id});
  }
}

export default UserRepository;
