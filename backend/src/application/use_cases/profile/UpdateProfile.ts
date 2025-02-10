import { ResponseModel } from "../../../shared/types/ResponseModel";
import { ILearnerRepository } from "../../IRepositories/ILearnerRepository";
import { IMentorRepository } from "../../IRepositories/IMentorRepository";
import { User } from "../../../shared/types/User";

interface UpdateProfileDTO {
  firstName: string;
  lastName: string;
}
class UpdateProfileByIdUseCase {
  private mentorRepository: IMentorRepository;

  constructor(mentorRepository: IMentorRepository) {
    this.mentorRepository = mentorRepository;
  }

  async execute(
    data: UpdateProfileDTO,
    mentorId: string
  ): Promise<ResponseModel> {
    try {
      const existingMentor = await this.mentorRepository.fetchMentorById(
        mentorId
      );

      if (!existingMentor) {
        return {
          statusCode: 404,
          success: false,
          message: "The profile doesn't exist!",
        };
      }
      const updatedProfile = await this.mentorRepository.updateMentor(
        mentorId,
        data
      );
      if (!updatedProfile) {
        return {
          statusCode: 400,
          success: false,
          message: "The profile update is failed!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The profile updated successfully.",
        data: {
          mentor: updatedProfile,
        },
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default UpdateProfileByIdUseCase;
