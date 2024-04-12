import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res
      .status(200)
      .send(new ApiResponse(200, users, "Users fetched successfully."));
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Error creating user."));
  }
};
