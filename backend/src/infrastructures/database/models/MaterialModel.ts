import mongoose, { Schema, Document, Model, ObjectId } from "mongoose";
import { MaterialType } from "../../../shared/types";

//interface for basic Material
export interface IMaterial extends Document {
  _id: ObjectId;
  title: string;
  description: string;
  mentorId: ObjectId;
  type: MaterialType;
  duration: number;
  url: string;
}

// Base schema
const materialSchema = new Schema<IMaterial>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    mentorId: { type: Schema.Types.ObjectId, ref: "Mentors", required: true },
    type: {
      type: String,
      required: true,
      enum: ["reading", "assessment", "video"],
    },
    duration: { type: Number, required: true },
    url: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const MaterialModel = mongoose.model<IMaterial>("Material", materialSchema);

export default MaterialModel;
