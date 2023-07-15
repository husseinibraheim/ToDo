import { Request, Response, NextFunction } from "express";
// Response handeler in readable way
export const sendResponse = (res : Response , message : String , data : any , statusCode : number , token ?: string)=>{
    res.status(statusCode).json({
        message : message,
        data : data,
        token : token
    })
}