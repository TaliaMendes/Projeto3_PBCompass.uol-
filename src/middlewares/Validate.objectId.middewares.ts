import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';

const validateObjectId = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.params;
  if (!isValidObjectId(_id)) {
    return res.status(400).json({ 
      code: 400, 
      status: 'Bad Request',
      message: 'Invalid ID format' 
    });
  }
  next();
};

export default validateObjectId;
