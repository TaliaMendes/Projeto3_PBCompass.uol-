import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { userSchema } from '../validators/User.validator';

const validateUSer = (req: Request, res: Response, next: NextFunction) => {
  try {
    userSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: 'Validation failed',
        errors: error.errors
      });
    } else {
      next(error);
    }
  }
};

export default validateUSer;
