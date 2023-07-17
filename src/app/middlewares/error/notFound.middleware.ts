import { Request, Response, NextFunction } from 'express';
// Not found End Point
export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({ message: 'End point not found' });
};
