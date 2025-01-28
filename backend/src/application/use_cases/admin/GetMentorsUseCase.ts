import { ResponseModel } from "../../../shared/types/ResponseModel";
import { IMentorRepository } from "../../IRepositories/IMentorRepository";

class GetMentorsUseCase {
  private mentorRepository;
  constructor(mentorRepository: IMentorRepository) {
    this.mentorRepository = mentorRepository;
  }

  async execute(): Promise<ResponseModel> {
    const mentors = await this.mentorRepository.fetchAllMentors();
    if (!mentors) {
      return {
        statusCode: 404,
        success: false,
        message: "The mentors doesn't exist!",
      };
    }

    return {
      statusCode: 200,
      success: true,
      message: "The mentors are fetched successfully.",
      data: mentors,
    };
  }
}

export default GetMentorsUseCase;
