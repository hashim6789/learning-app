// infrastructure/models/LearnerModel.ts
import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface ILearner extends Document {
  _id: ObjectId;
  googleId: string | null;
  firstName: string;
  lastName: string | null;
  email: string;
  password: string | null;
  profilePicture: string | null;
  purchasedCourses: mongoose.Types.ObjectId[] | null;
  isBlocked: boolean | null;
}

const LearnerSchema: Schema = new Schema({
  googleId: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String },
  password: { type: String },
  email: { type: String, required: true },
  profilePicture: { type: String },
  purchasedCourses: [{ type: Schema.Types.ObjectId, ref: "Courses" }],
  isBlocked: { type: Boolean },
});

const LearnerModel = mongoose.model<ILearner>("Learner", LearnerSchema);

export default LearnerModel;
