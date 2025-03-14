import { ChatMessage } from "../../../../application/entities/chat-message.entity";

export interface IChatMessageRepository {
  createMessage(message: ChatMessage): Promise<ChatMessage | null>;
  getMessagesByGroup(groupId: string): Promise<ChatMessage[] | null>;
  deleteMessage(messageId: string): Promise<ChatMessage | null>;
}
