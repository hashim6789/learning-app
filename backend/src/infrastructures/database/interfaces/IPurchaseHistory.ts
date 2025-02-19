import { ObjectId } from "mongoose";

export interface IPurchaseHistory extends Document {
  _id: ObjectId;
  userId: ObjectId;
  courseId: ObjectId;
  purchaseDate: Date;
  paymentIntentId: string;
  amount: number;
  status: string;
}
