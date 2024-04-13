import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const fetchUserInfo = async (req, res) => {
  try {
    const exists = await User.findById(req.user._id).select(
      "-password -refreshToken"
    );

    res
      .status(200)
      .send(new ApiResponse(200, exists, "User info fetched successfully."));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Error fetching user info."));
  }
};
