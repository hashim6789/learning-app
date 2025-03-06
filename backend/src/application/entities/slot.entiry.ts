// src/domain/entities/Notification.ts

export class Slot {
  constructor(
    public id: string,
    public mentorId: string,
    public duration: number,
    public dateTime: Date,
    public isBooked: boolean
  ) {}
}
