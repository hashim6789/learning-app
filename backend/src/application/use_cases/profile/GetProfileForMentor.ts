import { ResponseModel } from "../../../shared/types/ResponseModel";
import { ILearnerRepository } from "../../IRepositories/ILearnerRepository";
import { IMentorRepository } from "../../IRepositories/IMentorRepository";
import { User } from "../../../shared/types/User";

class GetProfileForMentorUseCase {
  private mentorRepository: IMentorRepository;

  constructor(mentorRepository: IMentorRepository) {
    this.mentorRepository = mentorRepository;
  }

  async execute(mentorId: string): Promise<ResponseModel> {
    try {
      const existingMentor = await this.mentorRepository.fetchById(mentorId);

      if (!existingMentor) {
        return {
          statusCode: 404,
          success: false,
          message: "The profile doesn't exist!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The profile updated successfully.",
        data: {
          mentor: existingMentor,
        },
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default GetProfileForMentorUseCase;
