// src/adapters/controllers/NotificationController.ts
import { Request, Response, NextFunction } from "express";
import { SendNotification } from "../../application/use_cases/notification/notification-send.usecase";
import { Notification } from "../../application/entities/notification.entity";
import { NotificationRepository } from "../../infrastructures/database/repositories/NotificatinRepository";
import { NotificationService } from "../../infrastructures/services/NotificationService";
import GetAllNotificationOfUserUseCase from "../../application/use_cases/notification/notification-get-all-user.usecase";

const notificationRepository = new NotificationRepository();
const notificationService = new NotificationService(notificationRepository);
const sendNotification = new SendNotification(notificationService);
const getAllNotificationOfUserUseCase = new GetAllNotificationOfUserUseCase(
  notificationRepository
);

export class NotificationController {
  constructor() {}

  async send(req: Request, res: Response): Promise<void> {
    const { title, message, recipientId } = req.body;

    const notification = new Notification(
      "",
      title,
      message,
      recipientId,
      Date.now()
    );

    await sendNotification.execute(notification);

    res.status(201).json({ message: "Notification sent" });
  }

  //get published courses
  async getNotificationsByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.userId || "";
      const response = await getAllNotificationOfUserUseCase.execute(userId);
      if (response.success && response.data) {
        res
          .status(200)
          .json({ message: response.message, data: response.data });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }
}
