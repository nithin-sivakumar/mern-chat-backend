import express from "express";
import { chatController } from "../controllers/chat.controller.js";
import { checkAuth } from "../middlewares/auth.middleware.js";
const chatRouter = express.Router();

chatRouter.route("/").post(checkAuth, chatController.accessChat);

chatRouter.route("/").get(checkAuth, chatController.fetchChats);

chatRouter
  .route("/create-group")
  .get(checkAuth, chatController.createGroupChat);

chatRouter.route("/fetch-groups").get(checkAuth, chatController.fetchGroups);

chatRouter.route("/group-exit").get(checkAuth, chatController.groupExit);

chatRouter.route("/join-group").post(checkAuth, chatController.addSelfToGroup);

export { chatRouter };
