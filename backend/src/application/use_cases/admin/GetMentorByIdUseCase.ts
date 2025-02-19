import { ResponseModel } from "../../../shared/types/ResponseModel";
import { IMentorRepository } from "../../IRepositories/IMentorRepository";

class GetMentorByIdUseCase {
  private mentorRepository: IMentorRepository;
  constructor(mentorRepository: IMentorRepository) {
    this.mentorRepository = mentorRepository;
  }

  async execute(mentorId: string): Promise<ResponseModel> {
    try {
      const mentor = await this.mentorRepository.fetchById(mentorId);
      if (!mentor) {
        return {
          statusCode: 404,
          success: false,
          message: "The mentor doesn't exist!",
        };
      }

      mentor.password = null;

      return {
        statusCode: 200,
        success: true,
        message: `The mentor ${mentor.firstName} fetched successfully.`,
        data: mentor,
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default GetMentorByIdUseCase;
