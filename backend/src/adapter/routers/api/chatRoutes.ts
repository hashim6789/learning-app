// src/adapters/routes/chatRoutes.ts
import { Router } from "express";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import checkUserBlocked from "../../middleware/checkBlockMiddleware";
import authorizeRole from "../../middleware/authorizationMiddlewares";
import ChatController from "../../controllers/ChatController";

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
