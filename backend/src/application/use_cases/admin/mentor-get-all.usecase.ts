import { UserQuery } from "../../../shared/types/query";
import { ResponseModel } from "../../../shared/types/ResponseModel";
import { IMentorRepository } from "../../../infrastructures/database/repositories/interface/IMentorRepository";

class GetMentorsUseCase {
  private mentorRepository;
  constructor(mentorRepository: IMentorRepository) {
    this.mentorRepository = mentorRepository;
  }

  async execute(query: UserQuery): Promise<ResponseModel> {
    const fetchMentorsData = await this.mentorRepository.fetchAll(query);
    if (!fetchMentorsData) {
      return {
        statusCode: 404,
        success: false,
        message: "The admin doesn't exist or invalid credentials!",
      };
    }

    return {
      statusCode: 200,
      success: true,
      message: "The users fetched successfully",
      data: {
        mentors: fetchMentorsData.users,
        docCount: fetchMentorsData.docCount,
      },
    };
  }
}

export default GetMentorsUseCase;
