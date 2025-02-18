// src/domain/entities/Notification.ts
export class Notification {
  constructor(
    public id: string,
    public title: string,
    public message: string,
    public recipientId: string,
    public createdAt: Date
  ) {}
}
