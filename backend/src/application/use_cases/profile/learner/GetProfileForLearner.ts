import { ILearnerRepository } from "../../../IRepositories/ILearnerRepository";
import { ResponseModel } from "../../../../shared/types/ResponseModel";

class GetProfileForLearnerUseCase {
  private learnerRepository: ILearnerRepository;

  constructor(learnerRepository: ILearnerRepository) {
    this.learnerRepository = learnerRepository;
  }

  async execute(learnerId: string): Promise<ResponseModel> {
    try {
      const existingLearner = await this.learnerRepository.fetchById(learnerId);

      if (!existingLearner) {
        return {
          statusCode: 404,
          success: false,
          message: "The profile doesn't exist!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The profile fetched successfully.",
        data: {
          learner: existingLearner,
        },
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default GetProfileForLearnerUseCase;
