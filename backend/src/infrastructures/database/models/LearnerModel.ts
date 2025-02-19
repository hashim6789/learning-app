// infrastructure/models/LearnerModel.ts
import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { ILearner } from "../interfaces/ILearner";

const LearnerSchema: Schema = new Schema(
  {
    googleId: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String },
    password: { type: String },
    email: { type: String, required: true },
    profilePicture: { type: String },
    purchasedCourses: [{ type: Schema.Types.ObjectId, ref: "Courses" }],
    isBlocked: { type: Boolean, default: false },
    refreshToken: { type: String },
    isVerified: { type: Boolean, default: false },
    resetToken: { type: String },
  },
  {
    timestamps: true,
  }
);

const LearnerModel = mongoose.model<ILearner>("Learner", LearnerSchema);

export default LearnerModel;
