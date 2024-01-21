import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { deleteUserChats, genrateChatCompletion, sendChatsToUser } from "../controllers/chat-controllers.js";
// protected API
const chatRoutes = Router();
chatRoutes.post("/new", validate(chatCompletionValidator), verifyToken, genrateChatCompletion);
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
chatRoutes.delete("/delete-chats", verifyToken, deleteUserChats);
export default chatRoutes;
//# sourceMappingURL=chat-routes.js.map