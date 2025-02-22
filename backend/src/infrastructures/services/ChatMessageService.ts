// import { IChatMessage } from "../database/interfaces/IChatMessage";
// import chatMessageRepository from "../repositories/chatMessageRepository";

// interface ChatMessageService {
//   sendMessage(
//     groupId: string,
//     senderId: string,
//     message: string
//   ): Promise<IChatMessage>;
//   fetchMessages(groupId: string): Promise<IChatMessage[]>;
//   removeMessage(messageId: string): Promise<IChatMessage | null>;
// }

// const chatMessageService: ChatMessageService = {
//   async sendMessage(
//     groupId: string,
//     senderId: string,
//     message: string
//   ): Promise<IChatMessage> {
//     const newMessage: IChatMessage = {
//       group: groupId,
//       sender: senderId,
//       message,
//       createdAt: new Date(),
//     };
//     return await chatMessageRepository.createMessage(newMessage);
//   },

//   async fetchMessages(groupId: string): Promise<IChatMessage[]> {
//     return await chatMessageRepository.getMessagesByGroup(groupId);
//   },

//   async removeMessage(messageId: string): Promise<IChatMessage | null> {
//     return await chatMessageRepository.deleteMessage(messageId);
//   },
// };

// export default chatMessageService;
