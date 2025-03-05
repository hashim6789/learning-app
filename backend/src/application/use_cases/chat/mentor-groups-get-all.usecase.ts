import { ResponseModel } from "../../../shared/types/ResponseModel";
import IGroupChatRepository from "../../../infrastructures/database/repositories/interface/IGroupChatRepository";
import { UserType } from "../../../shared/types";

class GetAllGroupsOfUserUseCase {
  private groupChatRepository: IGroupChatRepository;

  constructor(groupChatRepository: IGroupChatRepository) {
    this.groupChatRepository = groupChatRepository;
  }

  async execute(userId: string, role: UserType): Promise<ResponseModel> {
    try {
      let groupChats;

      if (role === "mentor") {
        groupChats = await this.groupChatRepository.fetchAllByMentorId(userId);
      } else {
        groupChats = await this.groupChatRepository.fetchAllByLearnerId(userId);
      }
      if (!groupChats) {
        return {
          statusCode: 404,
          success: false,
          message: "The groups is not exist!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The purchase groups is fetched successfully.",
        data: groupChats,
      };
    } catch (error) {
      throw new Error(
        "An error occurred while creating the course: " + (error as string)
      );
    }
  }
}

export default GetAllGroupsOfUserUseCase;
