import { ResponseModel } from "../../../shared/types/ResponseModel";
import { ILearnerRepository } from "../../IRepositories/ILearnerRepository";

interface BlockData {
  change: boolean;
}
class BlockUnblockLearnerUseCase {
  private learnerRepository: ILearnerRepository;
  constructor(learnerRepository: ILearnerRepository) {
    this.learnerRepository = learnerRepository;
  }

  async execute(learnerId: string, data: BlockData): Promise<ResponseModel> {
    const learner = await this.learnerRepository.updateById(learnerId, {
      isBlocked: !data.change,
    });
    if (!learner)
      return {
        statusCode: 404,
        success: false,
        message: "The learner is doesn't exist!",
      };
    return {
      statusCode: 201,
      success: true,
      message: data.change
        ? "The learner is blocked successfully."
        : "The learner is unblocked successfully.",
      data: learner,
    };
  }
}

export default BlockUnblockLearnerUseCase;
