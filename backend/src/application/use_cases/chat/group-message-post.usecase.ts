import { validateData } from "../../../shared/helpers/validateHelper";
import { ResponseModel } from "../../../shared/types/ResponseModel";
import { ChatMessage } from "../../entities/chat-message.entity";
import { IChatMessageRepository } from "../../IRepositories/IChatMessageRepository";
import IGroupChatRepository from "../../IRepositories/IGroupChatRepository";
import { getIo } from "../../../framework/socket/socketSetup";
import { ILearnerRepository } from "../../IRepositories/ILearnerRepository";

interface CreateMessageDTO {
  message: string;
}
class CreateMessageOfSenderUseCase {
  private chatMessageRepository: IChatMessageRepository;
  private learnerRepository: ILearnerRepository;

  constructor(
    chatMessageRepository: IChatMessageRepository,
    learnerRepository: ILearnerRepository
  ) {
    this.chatMessageRepository = chatMessageRepository;
    this.learnerRepository = learnerRepository;
  }

  async execute(
    senderId: string,
    groupId: string,
    data: CreateMessageDTO
  ): Promise<ResponseModel> {
    try {
      // await validateData(data, CreateMessageDTO)
      const fetchUser = await this.learnerRepository.fetchById(senderId);
      if (!fetchUser) {
        return {
          statusCode: 404,
          success: false,
          message: "The learner doesn't exist!",
        };
      }

      const message = new ChatMessage(
        "",
        groupId,
        senderId,
        data.message,
        Date.now()
      );
      const newMessage = await this.chatMessageRepository.createMessage(
        message
      );
      if (!newMessage) {
        return {
          statusCode: 400,
          success: false,
          message: "The message is not created!",
        };
      }

      const messageData = {
        _id: newMessage.id,
        message: message.message,
        sender: {
          _id: fetchUser.id,
          profilePicture: fetchUser.profilePicture,
          name: `${fetchUser.firstName} ${fetchUser.lastName}`,
        },
        createdAt: newMessage.createdAt,
      };
      // Emit the message to the group via socket.io
      const io = getIo();
      if (io) {
        console.log("Emitting message to group:", groupId);
        io.to(groupId).emit("receiveChat", messageData);
      }

      return {
        statusCode: 201,
        success: true,
        message: "The message is created successfully.",
        data: newMessage,
      };
    } catch (error) {
      throw new Error(
        "An error occurred while creating the course: " + (error as string)
      );
    }
  }
}

export default CreateMessageOfSenderUseCase;
