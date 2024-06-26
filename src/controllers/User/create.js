import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const alreadyExists = await User.findOne({ email });

    if (alreadyExists) {
      return res
        .status(409)
        .send(
          new ApiResponse(409, null, "Account already exists. Kindly sign in.")
        );
    }

    const hashed = await bcrypt.hash(password, 10);

    const created = await User.create({
      name,
      email,
      password: hashed,
    });

    const at = created.generateAccessToken();
    const rt = created.generateRefreshToken();

    created.refreshToken = rt;
    await created.save();

    res.cookie("at", at);
    res.cookie("rt", rt);

    res
      .status(201)
      .send(
        new ApiResponse(
          201,
          { user: created, accessToken: at, refreshToken: rt },
          "User created successfully."
        )
      );
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Error creating user."));
  }
};
