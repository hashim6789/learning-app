import { Notification } from "../../../application/entities/notification.entity";
import { INotificationRepository } from "./interface/INotificationRepository";
import { INotification } from "../interfaces/INotification";
import NotificationModel from "../models/NotificationModel";

export class NotificationRepository implements INotificationRepository {
  async save(notification: Notification): Promise<Notification | null> {
    const newNotification = new NotificationModel({
      title: notification.title,
      message: notification.message,
      recipientId: notification.recipientId,
      createdAt: notification.createdAt,
    });
    const createdNotification = await newNotification.save();
    if (!createdNotification) return null;
    return this.mapToNotification(createdNotification);
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = await NotificationModel.findById(id).exec();
    if (!notification) {
      return null;
    }
    return this.mapToNotification(notification);
  }

  async findAllByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await NotificationModel.find({ recipientId })
      .sort({ createdAt: -1 })
      .exec();
    return notifications.map(this.mapToNotification);
  }

  private mapToNotification(doc: INotification): Notification {
    return new Notification(
      doc._id.toString(),
      doc.title,
      doc.message,
      doc.recipientId.toString(),
      doc.createdAt.getTime()
    );
  }
}

export default NotificationRepository;
