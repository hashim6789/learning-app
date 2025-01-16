import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { ICategory } from "./CategoryModel";

export interface ICourses extends Document {
  _id: ObjectId;
  title: string;
  mentorId: ObjectId;
  categoryId: ICategory | ObjectId;
  description: string | null;
  thumbnail: string | null;
  lessons: ObjectId[] | null;
  duration: string | null;
  status: string | null;
  rejectionReason: string | null;
  purchaseCount: number | null;
}

const CoursesSchema: Schema = new Schema({
  title: { type: String, required: true },
  mentorId: { type: Schema.Types.ObjectId, ref: "Mentors", required: true },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Categories",
    required: true,
  },
  description: { type: String },
  thumbnail: { type: String },
  lessons: [{ type: Schema.Types.ObjectId, ref: "Lessons" }],
  duration: { type: String },
  status: {
    type: String,
    enum: ["draft", " pending", " published", " rejected"],
    default: "draft",
  },
  rejectionReason: { type: String },
  purchaseCount: { type: Number },
});

const Courses = mongoose.model<ICourses>("Courses", CoursesSchema);

export default Courses;
