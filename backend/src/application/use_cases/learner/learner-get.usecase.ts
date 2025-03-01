import { ResponseModel } from "../../../shared/types/ResponseModel";
import { ILearnerRepository } from "../../../infrastructures/database/repositories/interface/ILearnerRepository";

class GetLearnerByIdUseCase {
  private learnerRepository: ILearnerRepository;
  constructor(learnerRepository: ILearnerRepository) {
    this.learnerRepository = learnerRepository;
  }

  async execute(learnerId: string): Promise<ResponseModel> {
    try {
      const learner = await this.learnerRepository.fetchById(learnerId);
      if (!learner) {
        return {
          statusCode: 404,
          success: false,
          message: "The learner doesn't exist!",
        };
      }

      learner.password = null;

      return {
        statusCode: 200,
        success: true,
        message: `The learner ${learner.firstName} fetched successfully.`,
        data: learner,
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default GetLearnerByIdUseCase;
