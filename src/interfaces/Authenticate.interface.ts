import { IUser } from './Users.interface';

export interface IAuth {
   token: string
   user: IUser
}