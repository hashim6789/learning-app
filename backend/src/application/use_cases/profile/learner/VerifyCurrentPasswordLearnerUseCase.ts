import bcrypt from "bcryptjs";
import { ILearnerRepository } from "../../../IRepositories/ILearnerRepository";
import { ResponseModel } from "../../../../shared/types/ResponseModel";

interface VerifyPasswordDTO {
  currentPassword: string;
}
class VerifyCurrentPasswordForLearnerUseCase {
  private learnerRepository: ILearnerRepository;

  constructor(learnerRepository: ILearnerRepository) {
    this.learnerRepository = learnerRepository;
  }

  async execute(
    data: VerifyPasswordDTO,
    learnerId: string
  ): Promise<ResponseModel> {
    try {
      const existingLearner = await this.learnerRepository.fetchById(learnerId);

      if (!existingLearner) {
        return {
          statusCode: 404,
          success: false,
          message: "The profile doesn't exist!",
        };
      }

      const isPasswordValid = existingLearner.password
        ? await bcrypt.compare(
            data.currentPassword,
            existingLearner.password as string
          )
        : learnerId === existingLearner.id;
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

export default VerifyCurrentPasswordForLearnerUseCase;
