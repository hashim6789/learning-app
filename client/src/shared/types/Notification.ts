// src/shared/types/Notification.ts

export interface Notification {
  id: string;
  title: string;
  message: string;
  recipientId: string;
  createdAt: Date;
}
