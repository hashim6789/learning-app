import { ObjectId } from "mongoose";

export interface ISubscriptionPlan extends Document {
  _id: ObjectId;
  title: string;
  duration: number;
  price: number;
}
