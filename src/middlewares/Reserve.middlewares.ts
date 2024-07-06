import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ReserveSchema } from '../validators/Reserve.validators';

const validateReserve = (req: Request, res: Response, next: NextFunction) => {
  try {
    ReserveSchema.parse(req.body);
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

export default validateReserve;