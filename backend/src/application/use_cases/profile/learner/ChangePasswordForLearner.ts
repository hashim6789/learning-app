import bcrypt from "bcryptjs";
import { ILearnerRepository } from "../../../IRepositories/ILearnerRepository";
import { ResponseModel } from "../../../../shared/types/ResponseModel";

interface UpdatePasswordDTO {
  newPassword: string;
  confirmPassword: string;
}
class ChangeLearnerPasswordUseCase {
  private learnerRepository: ILearnerRepository;

  constructor(learnerRepository: ILearnerRepository) {
    this.learnerRepository = learnerRepository;
  }

  async execute(
    data: UpdatePasswordDTO,
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

      const hashedPassword = await bcrypt.hash(data.newPassword, 10);

      const updatedProfile = await this.learnerRepository.updateById(
        learnerId,
        {
          password: hashedPassword,
        }
      );
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

export default ChangeLearnerPasswordUseCase;
