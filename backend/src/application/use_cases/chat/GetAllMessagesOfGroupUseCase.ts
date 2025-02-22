import { ResponseModel } from "../../../shared/types/ResponseModel";
import { IChatMessageRepository } from "../../IRepositories/IChatMessageRepository";
import IGroupChatRepository from "../../IRepositories/IGroupChatRepository";

class GetAllMessagesOfGroupUseCase {
  private chatMessageRepository: IChatMessageRepository;

  constructor(chatMessageRepository: IChatMessageRepository) {
    this.chatMessageRepository = chatMessageRepository;
  }

  async execute(groupId: string): Promise<ResponseModel> {
    try {
      const groupMessages = await this.chatMessageRepository.getMessagesByGroup(
        groupId
      );
      if (!groupMessages) {
        return {
          statusCode: 404,
          success: false,
          message: "The group have no messages!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The groups messages are fetched successfully.",
        data: groupMessages,
      };
    } catch (error) {
      throw new Error(
        "An error occurred while creating the course: " + (error as string)
      );
    }
  }
}

export default GetAllMessagesOfGroupUseCase;
