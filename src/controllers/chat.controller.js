import { accessChat } from "./Chat/accessChat.js";
import { createGroupChat } from "./Chat/createGroupChat.js";
import { fetchChats } from "./Chat/fetchChats.js";
import { fetchGroups } from "./Chat/fetchGroups.js";
import { groupExit } from "./Chat/groupExit.js";

const chatController = {
  accessChat: accessChat,
  fetchChats: fetchChats,
  createGroupChat: createGroupChat,
  fetchGroups: fetchGroups,
  groupExit: groupExit,
};

export { chatController };
