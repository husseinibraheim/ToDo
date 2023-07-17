import express from "express";
import cors from "cors";
import path from "path";
import userRouter from "./routes/user.routes"
import postRouter from "./routes/post.routes"
import errorMW from "./middlewares/error/error.middleware"
import adminRouter from "./routes/admin.routes"
import { notFoundMiddleware } from "./middlewares/error/notFound.middleware";
import { isAdmin } from "./middlewares/authorization/adminAuth";
import { auth } from "./middlewares/authorization/jwt.utils";
const app = express();
app.use(express.static(path.join(__dirname,"../../dist/upload")))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
//Admin Router 
app.use('/api/v1/admin',auth, isAdmin,adminRouter);
// User Router
app.use("/api/v1/users",userRouter);
// Posts Router
app.use("/api/v1/posts",postRouter)
// Not Found End point
app.use(notFoundMiddleware); 
// Error middle ware
app.use(errorMW)

export default app;
