// src/infrastructure/repositories/NotificationRepository.ts
import { Notification } from "../../../application/entities/Notification";
import { INotificationRepository } from "../../../application/IRepositories/INotificationRepository";

export class NotificationRepository implements INotificationRepository {
  private notifications: Notification[] = [];

  async save(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async findById(id: string): Promise<Notification | null> {
    return this.notifications.find((n) => n.id === id) || null;
  }

  async findAllByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter((n) => n.recipientId === recipientId);
  }
}
