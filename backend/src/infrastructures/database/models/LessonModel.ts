import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface ILessons extends Document {
  _id: ObjectId;
  title: string;
  description: string | null;
  courseId: ObjectId;
  materials: ObjectId[] | null;
}

const LessonsSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    courseId: { type: Schema.Types.ObjectId, ref: "Courses", required: true },
    materials: [{ type: Schema.Types.ObjectId }],
  },
  {
    timestamps: true,
  }
);

const LessonModel = mongoose.model<ILessons>("Lessons", LessonsSchema);

export default LessonModel;
