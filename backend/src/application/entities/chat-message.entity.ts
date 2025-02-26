// src/domain/entities/Notification.ts
export class ChatMessage {
  constructor(
    public id: string,
    public group: string,
    public sender: string,
    public message: string,
    public createdAt: number
  ) {}
}
