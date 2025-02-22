import { ObjectId } from "mongoose";

export interface IChatGroup extends Document {
  course: ObjectId;
  mentor: ObjectId;
  learners: ObjectId[];
  createdAt: Date;
}
