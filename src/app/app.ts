import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes"
import postRouter from "./routes/post.routes"
import errorMW from "./middlewares/error.middleware"
import { notFoundMiddleware } from "./middlewares/notFound.middleware";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// User Router
app.use("/api/v1/users",userRouter);
// Posts Router
app.use("/api/v1/posts",postRouter)
// Not Found End point
app.use(notFoundMiddleware); 
// Error middle ware
app.use(errorMW)

export default app;
