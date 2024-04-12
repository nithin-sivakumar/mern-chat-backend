import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });

    if (!exists) {
      return res
        .status(404)
        .send(
          new ApiResponse(
            404,
            null,
            "Account with the provided email does not exist."
          )
        );
    }

    const verified = await exists.verifyPassword(password);

    if (!verified) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Invalid credentials."));
    }

    const at = exists.generateAccessToken();
    const rt = exists.generateRefreshToken();

    res.cookie("at", at, { maxAge: 900000 });
    res.cookie("rt", rt, { maxAge: 900000 });

    exists.refreshToken = rt;
    await exists.save();

    res
      .status(200)
      .send(
        new ApiResponse(
          200,
          { accessToken: at, refreshToken: rt },
          "User authenticated successfully."
        )
      );
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Error logging in user."));
  }
};
