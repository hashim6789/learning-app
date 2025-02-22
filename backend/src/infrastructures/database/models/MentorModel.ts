// infrastructure/models/MentorModel.ts
import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IMentor } from "../interfaces/IMentor";

const MentorSchema: Schema = new Schema(
  {
    googleId: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String },
    password: { type: String },
    email: { type: String, required: true },
    profilePicture: { type: String },
    bankDetails: [
      {
        accountNumber: { type: String },
        bankName: { type: String },
        ifscCode: { type: String },
      },
    ],
    createdCourses: [{ type: Schema.Types.ObjectId, ref: "Courses" }],
    isBlocked: { type: Boolean, default: false },
    refreshToken: { type: String },
    isVerified: { type: Boolean, default: false },
    resetToken: { type: String },
  },
  {
    timestamps: true,
  }
);

const MentorModel = mongoose.model<IMentor>("Mentor", MentorSchema);

export default MentorModel;
