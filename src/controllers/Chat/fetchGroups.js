import { ApiResponse } from "../../utils/ApiResponse.js";
import { Chat } from "../../models/chat.model.js";
import { User } from "../../models/user.model.js";

export const fetchGroups = async (req, res) => {
  try {
    const allGroups = await Chat.where("isGroupChat").equals(true);
    res
      .status(200)
      .send(
        new ApiResponse(200, allGroups, "Fetched all groups successfully.")
      );
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Error fetching groups."));
  }
};
