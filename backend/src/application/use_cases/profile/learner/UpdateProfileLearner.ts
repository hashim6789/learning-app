import { ILearnerRepository } from "../../../../infrastructures/database/repositories/interface/ILearnerRepository";
import { ResponseModel } from "../../../../shared/types/ResponseModel";

interface UpdateProfileDTO {
  firstName: string;
  lastName: string;
}
class UpdateProfileLearnerByIdUseCase {
  private learnerRepository: ILearnerRepository;

  constructor(learnerRepository: ILearnerRepository) {
    this.learnerRepository = learnerRepository;
  }

  async execute(
    data: UpdateProfileDTO,
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
      const updatedProfile = await this.learnerRepository.updateById(
        learnerId,
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
          learner: updatedProfile,
        },
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default UpdateProfileLearnerByIdUseCase;
