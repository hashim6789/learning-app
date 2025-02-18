import { ObjectId } from "mongoose";

export interface ISubscriptionHistory extends Document {
  _id: ObjectId;
  userId: ObjectId;
  planId: ObjectId;
  paymentIntentId: string;
  startDate: Date;
  endDate: Date;
  status: "active" | "expired";
}
