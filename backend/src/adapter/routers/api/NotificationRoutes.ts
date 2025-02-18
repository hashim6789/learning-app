// src/adapters/routes/notificationRoutes.ts
import { Router } from "express";
import { NotificationController } from "../../controllers/NotificationController";

const router = Router();

const notificationController = new NotificationController();

router.post("/send", notificationController.send);

export default router;
