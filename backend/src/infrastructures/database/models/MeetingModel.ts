import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { IMeeting } from "../interfaces/IMeeting";

const MeetingSchema: Schema = new Schema(
  {
    courseId: { type: Schema.Types.ObjectId, required: true, ref: "Courses" },
    learnerId: { type: Schema.Types.ObjectId, required: true, ref: "Learners" },
    mentorId: { type: Schema.Types.ObjectId, required: true, ref: "Mentors" },
    slotId: { type: Schema.Types.ObjectId, required: true, ref: "Slots" },
    roomId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const MeetingModel = mongoose.model<IMeeting>("Meetings", MeetingSchema);

export default MeetingModel;
