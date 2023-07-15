import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import APIError from './apiError';
import dotenv from "dotenv";
dotenv.config()
//import secrete key from .env
export const SECRET_KEY: Secret = process.env.SECRET_KEY
// extend from Request to add token type to the req
export interface CustomRequest extends Request {
 token: string | JwtPayload;
}
export const auth = async (req: Request, res: Response, next: NextFunction) => {
 try {
  //receive Token from request header
   const token = req.header('Authorization')
   if (!token) {
     throw new APIError("Please authenticate", 401)
   }
   //verify received Token 
   const decoded = jwt.verify(token, SECRET_KEY);
   (req as CustomRequest).token = decoded;

   next();
 } catch (err) {
    next(new APIError(err.message, err.status));
 }
};