import { ApiResponse } from "../../utils/ApiResponse.js";
import { Chat } from "../../models/chat.model.js";
import { User } from "../../models/user.model.js";

export const createGroupChat = async (req, res) => {
  try {
    if (!req.body.users || !req.body.name) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing."));
    }

    let users = req.body.users;
    // users.push(req.user);

    const groupChat = await Chat.create({
      name: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res
      .status(200)
      .send(new ApiResponse(200, fullGroupChat, "Group created successfully."));
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Error creating group."));
  }
};
