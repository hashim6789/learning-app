// src/application/usecases/SendNotification.ts

import { Notification } from "../../entities/notification.entity";
import { INotificationService } from "../../interfaces/INotificationService";

export class SendNotification {
  constructor(private notificationService: INotificationService) {}

  async execute(notification: Notification): Promise<void> {
    await this.notificationService.sendNotification(notification);
  }
}
