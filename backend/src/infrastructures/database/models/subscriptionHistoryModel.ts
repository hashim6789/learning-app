import { Schema, model, Document, Types } from "mongoose";
import { ISubscriptionHistory } from "../interfaces/ISubscriptionHistory";

const subscriptionHistorySchema = new Schema<ISubscriptionHistory>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  planId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  paymentIntentId: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "expired"],
    required: true,
    default: "active",
  },
});

const SubscriptionHistoryModel = model<ISubscriptionHistory>(
  "SubscriptionHistory",
  subscriptionHistorySchema
);

export default SubscriptionHistoryModel;
