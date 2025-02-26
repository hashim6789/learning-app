import { ResponseModel } from "../../../shared/types/ResponseModel";
import IGroupChatRepository from "../../IRepositories/IGroupChatRepository";

class GetAllGroupsOfLearnerUseCase {
  private groupChatRepository: IGroupChatRepository;

  constructor(groupChatRepository: IGroupChatRepository) {
    this.groupChatRepository = groupChatRepository;
  }

  async execute(learnerId: string): Promise<ResponseModel> {
    try {
      const groupChats = await this.groupChatRepository.fetchAllByLearnerId(
        learnerId
      );
      console.log("data", groupChats);
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

export default GetAllGroupsOfLearnerUseCase;
