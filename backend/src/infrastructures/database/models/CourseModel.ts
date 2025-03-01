import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { ICategory } from "./CategoryModel";
import { ICourses } from "../interfaces/ICourse";

const CoursesSchema: Schema = new Schema(
  {
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
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["draft", " pending", " published", " rejected"],
      default: "draft",
    },
    // duration: { type: Number },
    // rejectionReason: { type: String },
    // purchaseCount: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Courses = mongoose.model<ICourses>("Courses", CoursesSchema);

export default Courses;
