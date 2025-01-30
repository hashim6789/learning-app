import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface ILessons extends Document {
  _id: ObjectId;
  title: string;
  description: string | null;
  mentorId: ObjectId;
  duration: number;
  materials: ObjectId[] | null;
}

const LessonsSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    mentorId: { type: Schema.Types.ObjectId, required: true },
    duration: { type: Number, required: true },
    materials: [{ type: Schema.Types.ObjectId, ref: "Materials" }],
  },
  {
    timestamps: true,
  }
);

const LessonModel = mongoose.model<ILessons>("Lessons", LessonsSchema);

export default LessonModel;
