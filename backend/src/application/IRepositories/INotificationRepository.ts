// src/domain/repositories/INotificationRepository.ts
import { Notification } from "../entities/Notification";

export interface INotificationRepository {
  save(notification: Notification): Promise<void>;
  findById(id: string): Promise<Notification | null>;
  findAllByRecipientId(recipientId: string): Promise<Notification[]>;
}
