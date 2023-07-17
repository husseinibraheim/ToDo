import { Request, Response, NextFunction } from "express";
import AdminServices from "../services/admin.services";
import APIError from "../utils/apiError";
import { sendResponse } from "../utils/responseHandler";
import userModel from "../models/user.model";
import { CustomRequest } from "../middlewares/authorization/jwt.utils";

const adminServices = new AdminServices(userModel);

export const getOne = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const user = await adminServices.findOne(id);
        if(!user) throw new APIError("user not fount " , 409)
        sendResponse(res,"User retrieved successfully",user,200)
    } catch (err) {
        next(new APIError(err.message,err.statusCode))
     }
};

export const getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await adminServices.findAll();
        if (users.length === 0)
            throw new APIError("there arenot any users available", 409);
        sendResponse(res, "Users retrieved successfully", users, 200);
    } catch (err) {
        next(new APIError(err.message, err.statusCode));
    }
};

export const deleteUser = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        // Access the properties of the decoded token
        const result = await adminServices.delete(id);
        if (!result) throw new APIError("user not found", 406);

        sendResponse(
            res,
            `User with id :${result.id} deleted successfully`,
            result,
            200
        );
    } catch (err) {
        next(new APIError(err.message, err.status));
    }
};

