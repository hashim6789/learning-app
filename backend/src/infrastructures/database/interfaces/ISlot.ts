// models/Meeting.ts

import { ObjectId } from "mongoose";

export interface ISlot {
  _id: ObjectId;
  mentorId: ObjectId;
  duration: number;
  dateTime: Date;
  isBooked: boolean;
}
