import { ApiResponse } from "../../utils/ApiResponse.js";
import { Chat } from "../../models/chat.model.js";
import { User } from "../../models/user.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing."));
    }

    let message = await Chat.create({
      sender: req.user._id,
      content: content,
      chat: chatId,
    });

    message = await message.populate("sender", "name");
    message = await message.populate("chat");
    message = await message.populate("receiver");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res
      .status(200)
      .send(new ApiResponse(200, message, "Message sent successfully."));
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Error fetching groups."));
  }
};
