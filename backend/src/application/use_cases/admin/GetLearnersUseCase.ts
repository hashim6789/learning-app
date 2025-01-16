import { ResponseModel } from "../../../shared/types/ResponseModel";
import { ILearnerRepository } from "../../IRepositories/ILearnerRepository";

class GetLearnersUseCase {
  private learnerRepository;
  constructor(learnerRepository: ILearnerRepository) {
    this.learnerRepository = learnerRepository;
  }

  async execute(): Promise<ResponseModel> {
    const learners = await this.learnerRepository.fetchAllLearners();
    if (!learners || learners.length === 0) {
      return {
        statusCode: 404,
        success: false,
        message: "The admin doesn't exist or invalid credentials!",
      };
    }

    return {
      statusCode: 200,
      success: true,
      message: "The users fetched successfully",
      data: learners,
    };
  }
}

export default GetLearnersUseCase;
