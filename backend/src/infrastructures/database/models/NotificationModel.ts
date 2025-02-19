import { Schema, model, Document } from "mongoose";
import { INotification } from "../interfaces/INotification";

const notificationSchema = new Schema<INotification>(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    recipientId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const NotificationModel = model<INotification>(
  "Notification",
  notificationSchema
);

export default NotificationModel;
