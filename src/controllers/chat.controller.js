import { accessChat } from "./Chat/accessChat.js";
import { addSelfToGroup } from "./Chat/addSelfToGroup.js";
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
  addSelfToGroup: addSelfToGroup,
};

export { chatController };
