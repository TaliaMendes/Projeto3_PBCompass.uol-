import { Request, Response, NextFunction } from 'express';
import { carSchema } from '../validators/Car.validators';
import { z } from 'zod';

const validateCar = (req: Request, res: Response, next: NextFunction) => {
  try {
    carSchema.parse(req.body);
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

export default validateCar;
