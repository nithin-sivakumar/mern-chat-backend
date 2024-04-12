import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;

    const exists = await User.findById(id).select("-password");

    if (!exists) {
      return res
        .status(404)
        .send(
          new ApiResponse(
            404,
            null,
            "Account with the provided ID does not exist."
          )
        );
    }

    res
      .status(200)
      .send(new ApiResponse(200, exists, "User details fetched successfully."));
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Error creating user."));
  }
};
