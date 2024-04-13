import express from "express";
import { messageController } from "../controllers/message.controller.js";
import { checkAuth } from "../middlewares/auth.middleware.js";
const messageRouter = express.Router();

messageRouter.route("/:chatId").get(checkAuth, messageController.allMessages);

messageRouter.route("/").post(checkAuth, messageController.sendMessage);

export { messageRouter };
