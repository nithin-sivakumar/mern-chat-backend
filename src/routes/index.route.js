import express from "express";
import { userRouter } from "./user.route.js";
import { chatRouter } from "./chat.route.js";
import { messageRouter } from "./message.route.js";
const indexRouter = express.Router();

indexRouter.use("/api/users", userRouter);
indexRouter.use("/api/chats", chatRouter);
indexRouter.use("/api/messages", messageRouter);

export default indexRouter;
