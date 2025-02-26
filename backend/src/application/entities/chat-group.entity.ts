// src/domain/entities/Notification.ts
export class ChatGroup {
  constructor(
    public id: string,
    public course: string,
    public mentor: string,
    public learners: string[],
    public createdAt: number
  ) {}
}
