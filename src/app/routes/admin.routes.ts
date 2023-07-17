import { Router } from "express";
import * as adminController from "../controllers/admin.controller"

const router = Router()


//to get all users 
router.get('/users',adminController.getAll)

//to get one user 
router.get('/users/:id',adminController.getOne)

//delete user 
router.delete('/users/:id', adminController.deleteUser)

export default router;