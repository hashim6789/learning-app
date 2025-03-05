import { validateData } from "../../../shared/helpers/validateHelper";
import { ResponseModel } from "../../../shared/types/ResponseModel";
import { ChatMessage } from "../../entities/chat-message.entity";
import { IChatMessageRepository } from "../../../infrastructures/database/repositories/interface/IChatMessageRepository";
import IGroupChatRepository from "../../../infrastructures/database/repositories/interface/IGroupChatRepository";
import { getIo } from "../../../framework/socket/socketSetup";
import { ILearnerRepository } from "../../../infrastructures/database/repositories/interface/ILearnerRepository";
import { UserType } from "../../../shared/types";
import { IMentorRepository } from "../../../infrastructures/database/repositories/interface";

interface CreateMessageDTO {
  message: string;
}
class CreateMessageOfSenderUseCase {
  private chatMessageRepository: IChatMessageRepository;
  private learnerRepository: ILearnerRepository;
  private mentorRepository: IMentorRepository;

  constructor(
    chatMessageRepository: IChatMessageRepository,
    learnerRepository: ILearnerRepository,
    mentorRepository: IMentorRepository
  ) {
    this.chatMessageRepository = chatMessageRepository;
    this.learnerRepository = learnerRepository;
    this.mentorRepository = mentorRepository;
  }

  async execute(
    role: UserType,
    senderId: string,
    groupId: string,
    data: CreateMessageDTO
  ): Promise<ResponseModel> {
    try {
      // await validateData(data, CreateMessageDTO)
      let fetchUser;
      if (role === "mentor") {
        fetchUser = await this.mentorRepository.fetchById(senderId);
      } else {
        fetchUser = await this.learnerRepository.fetchById(senderId);
      }
      if (!fetchUser) {
        return {
          statusCode: 404,
          success: false,
          message: "The user doesn't exist!",
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
        groupId,
        message: message.message,
        sender: {
          _id: fetchUser.id,
          profilePicture: fetchUser.profilePicture,
          name: `${fetchUser.firstName} ${fetchUser.lastName}`,
        },
        createdAt: newMessage.createdAt,
      };
      // // Emit the message to the group via socket.io
      // const io = getIo();
      // if (io) {
      //   console.log("Emitting message to group:", groupId);
      //   io.to(groupId).emit("receiveMessages", messageData);
      // }

      return {
        statusCode: 201,
        success: true,
        message: "The message is created successfully.",
        data: messageData,
      };
    } catch (error) {
      throw new Error(
        "An error occurred while creating the course: " + (error as string)
      );
    }
  }
}

export default CreateMessageOfSenderUseCase;
