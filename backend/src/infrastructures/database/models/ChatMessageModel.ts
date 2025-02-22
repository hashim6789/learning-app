import { model, Schema } from "mongoose";
import { IChatMessage } from "../interfaces/IChatMessage";

const ChatMessageSchema: Schema<IChatMessage> = new Schema({
  group: { type: Schema.Types.ObjectId, ref: "ChatGroup", required: true },
  sender: { type: Schema.Types.ObjectId, ref: "Learners", required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ChatMessageModel = model<IChatMessage>("ChatMessage", ChatMessageSchema);

export default ChatMessageModel;
