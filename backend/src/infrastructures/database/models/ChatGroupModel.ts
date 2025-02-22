import { Schema, model, Document, Types } from "mongoose";
import { IChatGroup } from "../interfaces/IChatGroup";

const ChatGroupSchema: Schema<IChatGroup> = new Schema({
  course: { type: Schema.Types.ObjectId, ref: "Courses", required: true },
  mentor: { type: Schema.Types.ObjectId, ref: "Mentors", required: true },
  learners: [{ type: Schema.Types.ObjectId, ref: "Learners" }],
  createdAt: { type: Date, default: Date.now },
});
const ChatGroupModel = model<IChatGroup>("ChatGroup", ChatGroupSchema);

// export { ChatGroup, ChatMessage };

export default ChatGroupModel;
