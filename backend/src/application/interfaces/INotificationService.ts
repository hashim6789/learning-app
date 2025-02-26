// src/application/interfaces/INotificationService.ts
import { Notification } from "../entities/notification.entity";
export interface INotificationService {
  sendNotification(notification: Notification): Promise<void>;
}
