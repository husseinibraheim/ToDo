import { Request, Response, NextFunction } from "express";
import userModel from "../models/user.model";
import { sendResponse } from "../utils/responseHandler";
import APIError from "../utils/apiError";
import { validateUser } from "../middlewares/validation/validation";
import UserServices from "../services/user.services";
import bcrypt from "bcryptjs";
import { CustomRequest } from "../middlewares/authorization/jwt.utils";
import dotenv from "dotenv";
dotenv.config()
import jwt from "jsonwebtoken"
const userServices = new UserServices(userModel);
//for JWT token
const SECRET_KEY = process.env.SECRET_KEY

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    // Joi validation
    const { error } = validateUser(req.body);
    if (error) throw new APIError(error.toString(), 409);
    // check if email is already exists
    const existsUser = await userModel.find({ email: email });
    if (existsUser.length > 0) throw new APIError("User already exists", 400);
    // create user
    const createUser = new userModel(req.body);
    // save user in DataBase
    const user = await userServices.create(createUser);
    sendResponse(res, "User created successfully", user, 200);
  } catch (err) {
    next(new APIError(err.message, err.status));
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userServices.findAll();
    sendResponse(res, "Users retrieved successfully", users, 200);
  } catch (err) {
    next(new APIError(err.message, err.status));
  }
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await userServices.findOne(id);
    sendResponse(res, "User retrieved successfully", user, 200);
  } catch (err) {
    next(new APIError(err.message, err.status));
  }
};

export const updateUser = async (
  req: CustomRequest ,
  res: Response,
  next: NextFunction,

) => {
  try {
    const { id } = req.params;
    const data = req.body;
       // Access the properties of the decoded token
    const decoded = req.token;
    if(id !== decoded._id) throw new APIError("can't change other users data", 409);
    // check if user wanted to change email to an exists email
    const existsUser = await userServices.findAll({ email: data.email });
    if (existsUser.length > 0)
      throw new APIError("this email is already exist", 409);
    // update user data
    const updatedUser = await userServices.update(id, data);
    sendResponse(res, "User updated successfully", updatedUser, 200);
  } catch (err) {
    next(new APIError(err.message, err.status));
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
    const decoded = req.token;
    if(id !== decoded._id) throw new APIError("can't change other users data", 409);
    const result = await userServices.delete(id);
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

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    //find user by email
    const user = await userModel.findOne({ email});
    if (!user) throw new APIError("Wrong email ", 401);
    //check if password === hashed password
    const passMatched = await bcrypt.compare(password , user.password)
    if(!passMatched) throw new APIError('wrong password' , 404)
    //generate token 
    const token = jwt.sign({ _id: user._id?.toString(), name: user.firstName }, SECRET_KEY, {
      expiresIn: '2 days',
    });
    sendResponse(res,`Welcome ${user.firstName}, you logged in successfully`,user,200 , token);
  } catch (err) {
    next(new APIError(err.message, err.status));
  }
};
