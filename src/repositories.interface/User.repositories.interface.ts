import { IUser } from '../interfaces/Users.interface';
import { ICep } from  '../interfaces/Cep.interface';


export interface IUserRepository {
  listAllUsers(filters: Partial<IUser>):Promise<IUser[]>
  getUserById(_id: string):Promise<IUser | null>
  getUserByEmail(email: string):Promise<IUser | null>
  getUserByCpf(cpf: string):Promise<IUser | null>
  createUser(dataCep: ICep, userData: IUser):Promise<IUser | null>
  updateUser(_id: string, userData: IUser):Promise<IUser | null>
  removeUser(_id: string):Promise<void>
  getToken(): Promise<string>
}