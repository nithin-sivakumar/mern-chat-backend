import { ApiResponse } from "../../utils/ApiResponse.js";
import { Chat } from "../../models/chat.model.js";
import { User } from "../../models/user.model.js";

export const groupExit = async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!removed) {
      return res
        .status(404)
        .send(
          new ApiResponse(404, null, "Group chat not found. Unable to exit.")
        );
    }

    res
      .status(200)
      .send(new ApiResponse(200, null, "Removed from group successfully."));
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Error fetching groups."));
  }
};
