import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (scehme: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await scehme.parseAsync({
        body: req.body,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};
export default validateRequest;
