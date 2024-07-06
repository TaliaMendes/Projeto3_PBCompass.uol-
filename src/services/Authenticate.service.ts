import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../repositories.interface/User.repositories.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import { IUser } from '../interfaces/Users.interface'; 
@injectable()
class AuthService {
  constructor (
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ){}

  async authenticate(email: string, password: string): Promise<{ token: string; user: IUser }> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new createError.BadRequest('Invalid email');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new createError.BadRequest('Invalid email or password');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || '09f1d706131242c7c3b730cdcb0567b5', {
      expiresIn: '12h',
    });

    return { token, user };
  }
}

export default AuthService;
