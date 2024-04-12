import { createUser } from "./User/create.js";
import { deleteOneUser } from "./User/deleteOne.js";
import { getAllUsers } from "./User/getAll.js";
import { getOneUser } from "./User/getOne.js";
import { updateOneUser } from "./User/updateOne.js";

const userController = {
  register: createUser,
  getById: getOneUser,
  updateById: updateOneUser,
  deleteById: deleteOneUser,
  get: getAllUsers,
};

export { userController };
