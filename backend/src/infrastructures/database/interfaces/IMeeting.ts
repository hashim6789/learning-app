// models/Meeting.ts

import { ObjectId } from "mongoose";

export interface IMeeting {
  _id: ObjectId;
  courseId: ObjectId;
  learnerId: ObjectId;
  roomId: string;
  time: Date;
}
