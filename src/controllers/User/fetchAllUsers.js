import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const fetchAllUsers = async (req, res) => {
  try {
    const query = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(query)
      .find({ _id: { $ne: req.user._id } })
      .select("-password -refreshToken");

    res
      .status(200)
      .send(new ApiResponse(200, users, "Users fetched successfully."));
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Error creating user."));
  }
};
