import { Router } from "express";
import * as userController from "../controllers/user.controller"
import { auth } from "../middlewares/authorization/jwt.utils";
import { isAdmin } from "../middlewares/authorization/adminAuth";
const router = Router();

// Create user
router.post('/', userController.create)
// get all users
router.get('/', userController.getAll)
// get one user
router.get('/:id', userController.getOne)
// Edit user
router.patch('/:id',auth, userController.updateUser)
// Delete user
router.delete('/:id',auth, userController.deleteUser)
// User Login
router.post('/login', userController.login)

export default router;