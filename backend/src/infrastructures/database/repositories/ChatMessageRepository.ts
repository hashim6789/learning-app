import mongoose, { Schema, model, Types, Document } from "mongoose";
import { IChatMessage } from "../interfaces/IChatMessage";
import ChatMessageModel from "../models/ChatMessageModel";
import { IChatMessageRepository } from "../../../application/IRepositories/IChatMessageRepository";
import { ChatMessage } from "../../../application/entities/chat-message.entity";

class ChatMessageRepository implements IChatMessageRepository {
  async createMessage(message: ChatMessage): Promise<ChatMessage | null> {
    const newMessage = new ChatMessageModel(message);
    const createdMessage = await newMessage.save();
    if (!createdMessage) return null;
    return this.mapToMessage(createdMessage);
  }

  async getMessagesByGroup(groupId: string): Promise<ChatMessage[] | null> {
    const pipeline = [
      { $match: { group: new mongoose.Types.ObjectId(groupId) } },
      {
        $lookup: {
          from: "learners", // Assuming 'learners' is the collection where sender details are stored
          localField: "sender",
          foreignField: "_id",
          as: "senderDetails",
        },
      },
      { $unwind: "$senderDetails" },
      {
        $project: {
          _id: 1,
          sender: {
            _id: "$senderDetails._id",
            name: {
              $concat: [
                "$senderDetails.firstName",
                " ",
                "$senderDetails.lastName",
              ],
            },
            profilePicture: "$senderDetails.profilePicture",
          },
          message: 1,
          createdAt: 1,
        },
      },
    ];
    const messages = await ChatMessageModel.aggregate(pipeline);

    if (!messages) return null;
    return messages;
  }

  async deleteMessage(messageId: string): Promise<ChatMessage | null> {
    const deletedMessage = await ChatMessageModel.findByIdAndDelete(
      new Types.ObjectId(messageId)
    ).exec();
    if (!deletedMessage) return null;
    return this.mapToMessage(deletedMessage);
  }

  private mapToMessage(doc: Document): ChatMessage {
    return new ChatMessage(
      doc.get("_id").toString(),
      doc.get("group"),
      doc.get("sender"),
      doc.get("message"),
      doc.get("createdAt")
    );
  }
}

export default ChatMessageRepository;
