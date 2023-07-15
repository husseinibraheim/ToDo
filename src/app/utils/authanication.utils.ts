import { Request , Response , NextFunction } from "express";
import { CustomRequest } from "./jwt.utils";
import userModel from "../models/user.model";
import APIError from "./apiError";
export const isAdmin = async (req : CustomRequest , res:Response , next:NextFunction)=>{
    try{
        const userID = req.token._id
        const user = await userModel.findById(userID)
        const userRole = user.role
        if(userRole != "admin" && userID != user._id ) throw new APIError(`you aren't allowed to delete user`,405)
        next()
    }catch(err){
        next(new APIError(err.message,err.code))
    }

}