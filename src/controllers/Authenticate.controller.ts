import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthService from '../services/Authenticate.service';

class AuthController {
  async authenticate(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const authService = container.resolve(AuthService);
      const { token, user } = await authService.authenticate(email, password);
      return res.status(200).json({ token, user });
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default AuthController;
