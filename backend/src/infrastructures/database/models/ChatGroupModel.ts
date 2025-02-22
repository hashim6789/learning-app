import { Schema, model, Document, Types } from "mongoose";
import { IChatGroup } from "../interfaces/IChatGroup";
import { IChatMessage } from "../interfaces/IChatMessage";

const ChatGroupSchema: Schema<IChatGroup> = new Schema({
  course: { type: Schema.Types.ObjectId, ref: "Courses", required: true },
  mentor: { type: Schema.Types.ObjectId, ref: "Mentors", required: true },
  learners: [{ type: Schema.Types.ObjectId, ref: "Learners" }],
  createdAt: { type: Date, default: Date.now },
});

const ChatGroup = model<IChatGroup>("ChatGroup", ChatGroupSchema);

const ChatMessageSchema: Schema<IChatMessage> = new Schema({
  group: { type: Schema.Types.ObjectId, ref: "ChatGroup", required: true },
  sender: { type: Schema.Types.ObjectId, ref: "Learners", required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ChatMessage = model<IChatMessage>("ChatMessage", ChatMessageSchema);

export { ChatGroup, ChatMessage };
