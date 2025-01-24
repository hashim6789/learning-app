import { ResponseModel } from "../../../shared/types/ResponseModel";
import { IMentorRepository } from "../../IRepositories/IMentorRepository";

class LogoutMentorUseCase {
  private mentorRepository: IMentorRepository;
  constructor(mentorRepository: IMentorRepository) {
    this.mentorRepository = mentorRepository;
  }

  async execute(mentorId: string): Promise<ResponseModel> {
    const mentor = await this.mentorRepository.fetchMentorById(mentorId);
    if (!mentor) {
      return {
        statusCode: 404,
        success: false,
        message: "The mentor doesn't exist!",
      };
    }

    const unRefreshedMentor = await this.mentorRepository.deleteRefreshToken(
      mentor.id
    );
    if (!unRefreshedMentor) {
      return {
        statusCode: 400,
        success: false,
        message: "some thing wrong when deleting the refreshToken!",
      };
    }

    return {
      statusCode: 200,
      success: true,
      message: "Logout successful",
      data: {
        mentor: unRefreshedMentor,
      },
    };
  }
}

export default LogoutMentorUseCase;
