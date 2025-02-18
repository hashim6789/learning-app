// src/application/interfaces/INotificationService.ts
import { Notification } from "../entities/Notification";
export interface INotificationService {
  sendNotification(notification: Notification): Promise<void>;
}
