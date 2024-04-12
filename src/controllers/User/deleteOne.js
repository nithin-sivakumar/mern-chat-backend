import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import bcrypt from "bcryptjs";

export const deleteOneUser = async (req, res) => {
  try {
    const { id } = req.params;

    const exists = await User.findById(id);

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

    await exists.deleteOne();

    res
      .status(200)
      .send(new ApiResponse(200, exists, "User account deleted successfully."));
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Error creating user."));
  }
};
