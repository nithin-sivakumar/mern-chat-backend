import { allMessages } from "./Message/allMessages.js";
import { sendMessage } from "./Message/sendMessage.js";

const messageController = {
  allMessages: allMessages,
  sendMessage: sendMessage,
};

export { messageController };
