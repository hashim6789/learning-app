import { ResponseModel } from "../../../shared/types/ResponseModel";
import { ILearnerRepository } from "../../../infrastructures/database/repositories/interface/ILearnerRepository";
import { IMentorRepository } from "../../../infrastructures/database/repositories/interface/IMentorRepository";
import { User } from "../../../shared/types/User";

interface UpdateProfileImageDTO {
  profilePicture: string;
}
class UpdateProfileImageForMentorUseCase {
  private mentorRepository: IMentorRepository;

  constructor(mentorRepository: IMentorRepository) {
    this.mentorRepository = mentorRepository;
  }

  async execute(
    data: UpdateProfileImageDTO,
    mentorId: string
  ): Promise<ResponseModel> {
    try {
      const existingMentor = await this.mentorRepository.fetchById(mentorId);

      if (!existingMentor) {
        return {
          statusCode: 404,
          success: false,
          message: "The profile doesn't exist!",
        };
      }
      const updatedProfile = await this.mentorRepository.updateById(
        mentorId,
        data
      );
      if (!updatedProfile) {
        return {
          statusCode: 400,
          success: false,
          message: "The profile image update is failed!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The profile image updated successfully.",
        data: {
          mentor: updatedProfile,
        },
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default UpdateProfileImageForMentorUseCase;
