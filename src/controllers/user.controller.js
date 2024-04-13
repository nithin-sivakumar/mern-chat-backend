import { createUser } from "./User/create.js";
import { deleteOneUser } from "./User/deleteOne.js";
import { fetchAllUsers } from "./User/fetchAllUsers.js";
import { getAllUsers } from "./User/getAll.js";
import { getOneUser } from "./User/getOne.js";
import { loginUser } from "./User/login.js";
import { updateOneUser } from "./User/updateOne.js";

const userController = {
  register: createUser,
  getById: getOneUser,
  updateById: updateOneUser,
  deleteById: deleteOneUser,
  get: getAllUsers,
  login: loginUser,
  fetch: fetchAllUsers,
};

export { userController };
