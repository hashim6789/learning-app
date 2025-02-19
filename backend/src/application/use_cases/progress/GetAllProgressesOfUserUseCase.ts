import { ResponseModel } from "../../../shared/types/ResponseModel";
import { IProgressRepository } from "../../IRepositories/IProgressRepository";

class GetAllProgressOfUserUseCase {
  private progressRepository: IProgressRepository;
  constructor(progressRepository: IProgressRepository) {
    this.progressRepository = progressRepository;
  }

  async execute(userId: string): Promise<ResponseModel> {
    try {
      const progresses = await this.progressRepository.fetchAllByUserId(userId);
      if (!progresses) {
        return {
          statusCode: 404,
          success: false,
          message: "The progress is doesn't exist!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: `The progress fetched successfully.`,
        data: progresses,
      };
    } catch (error) {
      throw new Error("An Error when fetch the progress status!");
    }
  }
}

export default GetAllProgressOfUserUseCase;
