// src/adapters/routes/notificationRoutes.ts
import { Router } from "express";
import { NotificationController } from "../../controllers/notification.controller";
import {
  authenticateToken,
  authorizeRole,
  checkUserBlocked,
  validate,
} from "../../middleware";

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
