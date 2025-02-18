// src/adapters/controllers/NotificationController.ts
import { Request, Response, NextFunction } from "express";
import { SendNotification } from "../../application/use_cases/notification/SendNotificationUseCase";
import { Notification } from "../../application/entities/Notification";
import { NotificationRepository } from "../../infrastructures/database/repositories/NotificatinRepository";
import { NotificationService } from "../../infrastructures/services/NotificationService";

const notificationRepository = new NotificationRepository();
const notificationService = new NotificationService(notificationRepository);
const sendNotification = new SendNotification(notificationService);

export class NotificationController {
  constructor() {}

  async send(req: Request, res: Response): Promise<void> {
    const { title, message, recipientId } = req.body;

    const notification = new Notification(
      "1", // Replace with a proper ID generation mechanism
      title,
      message,
      recipientId,
      new Date()
    );

    await sendNotification.execute(notification);

    res.status(201).json({ message: "Notification sent" });
  }
}
