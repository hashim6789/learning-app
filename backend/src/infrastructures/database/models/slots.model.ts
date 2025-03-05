import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { IMeeting } from "../interfaces/IMeeting";
import { ISlot } from "../interfaces/ISlot";

const SlotSchema: Schema = new Schema(
  {
    mentorId: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
    dateTime: { type: Date, required: true },
    duration: { type: Number, required: true },
    isBooked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const SlotModel = mongoose.model<ISlot>("Slots", SlotSchema);

export default SlotModel;
