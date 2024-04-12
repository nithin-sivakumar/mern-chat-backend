import express from "express";
import { userRouter } from "./user.route.js";
const indexRouter = express.Router();

indexRouter.use("/api/users", userRouter);

export default indexRouter;
