import express from "express";
import { userController } from "../controllers/user.controller.js";
import { checkAuth } from "../middlewares/auth.middleware.js";
const userRouter = express.Router();

userRouter.route("/").get(userController.get);

userRouter.route("/fetch-users").get(checkAuth, userController.fetch);

userRouter
  .route("/:id")
  .get(userController.getById)
  .put(userController.updateById)
  .delete(userController.deleteById);

userRouter.route("/register").post(userController.register);
userRouter.route("/login").post(userController.login);

export { userRouter };
