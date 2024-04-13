import { ApiResponse } from "../../utils/ApiResponse.js";
import { Chat } from "../../models/chat.model.js";
import { User } from "../../models/user.model.js";
import { Message } from "../../models/message.model.js";

export const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name email")
      .populate("receiver")
      .populate("chat");

    res
      .status(200)
      .send(
        new ApiResponse(200, messages, "Fetched all messages successfully.")
      );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Error fetching messages."));
  }
};
