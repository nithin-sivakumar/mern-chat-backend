import express from "express";
import { userController } from "../controllers/user.controller.js";
const userRouter = express.Router();

userRouter.route("/").get(userController.get).post(userController.register);

userRouter
  .route("/:id")
  .get(userController.getById)
  .put(userController.updateById)
  .delete(userController.deleteById);

userRouter.route("/login").post(userController.login);

export { userRouter };
