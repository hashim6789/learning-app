import { ResponseModel } from "../../../shared/types/ResponseModel";
import { ILearnerRepository } from "../../IRepositories/ILearnerRepository";
import { IMentorRepository } from "../../IRepositories/IMentorRepository";
import { User } from "../../../shared/types/User";
import bcrypt from "bcryptjs";

interface UpdateProfileImageDTO {
  currentPassword: string;
}
class VerifyCurrentPasswordForMentorUseCase {
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

      const isPasswordValid = await bcrypt.compare(
        data.currentPassword,
        existingMentor.password as string
      );
      if (!isPasswordValid) {
        return {
          statusCode: 401,
          success: false,
          message: "Invalid current password!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The profile image updated successfully.",
        data: {
          isVerified: isPasswordValid,
        },
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default VerifyCurrentPasswordForMentorUseCase;
