import { ILearnerRepository } from "../../../IRepositories/ILearnerRepository";
import { ResponseModel } from "../../../../shared/types/ResponseModel";

interface UpdateProfileImageDTO {
  profilePicture: string;
}
class UpdateProfileImageForLearnerUseCase {
  private learnerRepository: ILearnerRepository;

  constructor(learnerRepository: ILearnerRepository) {
    this.learnerRepository = learnerRepository;
  }

  async execute(
    data: UpdateProfileImageDTO,
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
          message: "The profile image update is failed!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The profile image updated successfully.",
        data: {
          learner: updatedProfile,
        },
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default UpdateProfileImageForLearnerUseCase;
