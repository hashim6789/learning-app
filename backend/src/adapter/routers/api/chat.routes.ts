// src/adapters/routes/chatRoutes.ts
import { Router } from "express";
import authenticateToken from "../../middleware/authenticate.middleware";
import checkUserBlocked from "../../middleware/check-blocked.middleware";
import authorizeRole from "../../middleware/authorize.middleware";
import ChatController from "../../controllers/chat.controller";

const chatRouter = Router();

const chatController = new ChatController();

chatRouter.get(
  "/groups",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["learner"]),
  chatController.getGroupsDetailsOfLearner
);

chatRouter.post(
  "/groups/:groupId/message",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["learner", "mentor"]),
  chatController.postMessage
);
chatRouter.get(
  "/groups/:groupId/messages",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["learner", "mentor"]),
  chatController.getMessages
);

export default chatRouter;
