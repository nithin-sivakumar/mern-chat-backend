import { ApiResponse } from "../../utils/ApiResponse.js";
import { Chat } from "../../models/chat.model.js";
import { User } from "../../models/user.model.js";

export const accessChat = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "UserID missing from the request."));
    }

    const sender = await User.findById(userId);

    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name email",
    });

    if (isChat.length > 0) {
      return res
        .status(200)
        .send(new ApiResponse(200, isChat[0], "Chat accessed successfully."));
    } else {
      const created = await Chat.create({
        name: sender.name,
        isGroupChat: false,
        users: [req.user._id, userId],
      });
      const fullChat = await Chat.findOne({ _id: created._id }).populate(
        "users",
        "-password"
      );
      return res
        .status(200)
        .send(
          new ApiResponse(
            200,
            fullChat,
            "Chat created and fetched successfully."
          )
        );
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Error accessing chat."));
  }
};
