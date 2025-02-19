import { Schema, model, Document, ObjectId } from "mongoose";
import { ISubscriptionPlan } from "../interfaces/ISubscriptionPlan";

const subscriptionPlanSchema = new Schema<ISubscriptionPlan>({
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const SubscriptionPlanModel = model<ISubscriptionPlan>(
  "SubscriptionPlan",
  subscriptionPlanSchema
);

export default SubscriptionPlanModel;
