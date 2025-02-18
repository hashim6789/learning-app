import { ResponseModel } from "../../../shared/types/ResponseModel";
import { ILearnerRepository } from "../../IRepositories/ILearnerRepository";
import { IMentorRepository } from "../../IRepositories/IMentorRepository";
import { User } from "../../../shared/types/User";
import bcrypt from "bcryptjs";

interface UpdatePasswordDTO {
  newPassword: string;
  confirmPassword: string;
}
class ChangeMentorPasswordUseCase {
  private mentorRepository: IMentorRepository;

  constructor(mentorRepository: IMentorRepository) {
    this.mentorRepository = mentorRepository;
  }

  async execute(
    data: UpdatePasswordDTO,
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

      const hashedPassword = await bcrypt.hash(data.newPassword, 10);

      const updatedProfile = await this.mentorRepository.updateById(mentorId, {
        password: hashedPassword,
      });
      if (!updatedProfile) {
        return {
          statusCode: 400,
          success: false,
          message: "The password update is failed!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The password updated successfully.",
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default ChangeMentorPasswordUseCase;
