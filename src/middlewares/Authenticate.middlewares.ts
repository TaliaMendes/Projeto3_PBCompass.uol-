import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface MYRequest extends Request {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any;
}

const checkToken = (req: MYRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || '09f1d706131242c7c3b730cdcb0567b5';

    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token' });
    }
  } else {
    return res.status(401).json({ message: 'Access denied' });
  }
};

export { checkToken };
