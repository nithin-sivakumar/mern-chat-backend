import { ApiResponse } from "../../utils/ApiResponse.js";
import { Chat } from "../../models/chat.model.js";
import { User } from "../../models/user.model.js";

export const addSelfToGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!added) {
      return res
        .status(404)
        .send(new ApiResponse(404, null, "Chat not found."));
    }

    res
      .status(200)
      .send(new ApiResponse(200, added, "Added self to group successfully."));
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Error fetching groups."));
  }
};
