import { Request, Response, NextFunction } from "express";
import APIError from "../../utils/apiError";

// Global Error handeler middleware
export default (error: APIError,req: Request,res: Response, next: NextFunction) => {
  const { message, statusCode } = error;
  console.log(error);
  res.status(500).json({
    message,
  });
};
