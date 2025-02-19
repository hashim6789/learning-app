// src/adapters/routes/notificationRoutes.ts
import { Router } from "express";
import { NotificationController } from "../../controllers/NotificationController";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import checkUserBlocked from "../../middleware/checkBlockMiddleware";
import authorizeRole from "../../middleware/authorizationMiddlewares";

const notificationRouter = Router();

const notificationController = new NotificationController();

notificationRouter.post("/send", notificationController.send);
notificationRouter.get(
  "/",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["admin", "learner", "mentor"]),
  notificationController.getNotificationsByUserId
);

export default notificationRouter;
