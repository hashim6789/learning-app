import { ObjectId } from "mongoose";

export interface ICourses extends Document {
  _id: ObjectId;
  title: string;
  mentorId: ObjectId;
  categoryId: ObjectId;
  description: string | null;
  thumbnail: string;
  lessons: ObjectId[] | null;
  price: number;
  status: string | null;
  // duration: number | null;
  // rejectionReason: string | null;
  // purchaseCount: number | null;
}
