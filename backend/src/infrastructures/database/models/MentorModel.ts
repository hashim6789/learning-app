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

// export interface IMentor extends Document {
//   _id: ObjectId;
//   googleId: string | null;
//   firstName: string;
//   lastName: string | null;
//   email: string;
//   profilePicture: string | null;
//   createdCourses: ObjectId[] | null;
//   bankDetails: {
//     accountNumber: string | null;
//     bankName: string | null;
//     ifscCode: string | null;
//   }[];
//   refreshToken: string | null;
//   password: string | null;
//   isBlocked: boolean;
//   otp: string | null;
//   otpExpiration: number | null;
//   isVerified: boolean;
// }

// const MentorSchema: Schema = new Schema(
//   {
//     googleId: { type: String },
//     firstName: { type: String, required: true },
//     lastName: { type: String },
//     email: { type: String, required: true },
//     profilePicture: { type: String },
//     createdCourses: [{ type: Schema.Types.ObjectId, ref: "Courses" }],
//     bankDetails: [
//       {
//         accountNumber: { type: String },
//         bankName: { type: String },
//         ifscCode: { type: String },
//       },
//     ],
//     refreshToken: { type: String },
//     password: { type: String },
//     isBlocked: { type: Boolean, default: false },
//     otp: { type: String },
//     otpExpiration: { type: Date },
//     isVerified: { type: Boolean, default: false },
//   },
//   {
//     timestamps: true,
//   }
// );
