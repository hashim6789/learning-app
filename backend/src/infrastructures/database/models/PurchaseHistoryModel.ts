import { Schema, model, Document, Types } from "mongoose";
import { IPurchaseHistory } from "../interfaces/IPurchaseHistory";

const purchaseHistorySchema = new Schema<IPurchaseHistory>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  paymentIntentId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const PurchaseHistoryModel = model<IPurchaseHistory>(
  "PurchaseHistory",
  purchaseHistorySchema
);

export default PurchaseHistoryModel;
