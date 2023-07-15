import { Router } from "express";
import * as postsController from "../controllers/posts.controller"
import {  auth } from "../utils/jwt.utils";

const router = Router();
// Create post
router.post('/',auth,postsController.create);

//get all posts for specific user
router.get("/",auth,postsController.getAllPosts)

//get single post
router.get("/:id",postsController.getOnePost)

//update post 
router.patch("/:id",auth, postsController.updatePost)

//delete post
router.delete("/:id",auth, postsController.deletePost)


export default router;