// src/adapters/routes/notificationRoutes.ts
import { Router } from "express";
import { NotificationController } from "../../controllers/notification.controller";
import authenticateToken from "../../middleware/authenticate.middleware";
import checkUserBlocked from "../../middleware/check-blocked.middleware";
import authorizeRole from "../../middleware/authorize.middleware";

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
