import { UserQuery } from "../../../shared/types/query";
import { ResponseModel } from "../../../shared/types/ResponseModel";
import { ILearnerRepository } from "../../../infrastructures/database/repositories/interface/ILearnerRepository";

class GetLearnersUseCase {
  private learnerRepository;
  constructor(learnerRepository: ILearnerRepository) {
    this.learnerRepository = learnerRepository;
  }

  async execute(query: UserQuery): Promise<ResponseModel> {
    const fetchLearnersData = await this.learnerRepository.fetchAll(query);
    if (!fetchLearnersData) {
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
      data: {
        learners: fetchLearnersData.users,
        docCount: fetchLearnersData.docCount,
      },
    };
  }
}

export default GetLearnersUseCase;
