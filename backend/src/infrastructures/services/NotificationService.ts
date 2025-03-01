// src/infrastructure/services/NotificationService.ts
import { Notification } from "../../application/entities/notification.entity";
import { INotificationService } from "../../application/interfaces/INotificationService";
import { INotificationRepository } from "../database/repositories/interface/INotificationRepository";

export class NotificationService implements INotificationService {
  private notificationRepository: INotificationRepository;

  constructor(notificationRepository: INotificationRepository) {
    this.notificationRepository = notificationRepository;
  }

  async sendNotification(notification: Notification): Promise<void> {
    await this.notificationRepository.save(notification);
    // Additional logic for sending notifications can be added here
  }
}
