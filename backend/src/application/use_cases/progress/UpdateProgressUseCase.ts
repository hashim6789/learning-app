import { MaterialType } from "../../../shared/types";
import { ResponseModel } from "../../../shared/types/ResponseModel";
import { IProgressRepository } from "../../IRepositories/IProgressRepository";

class UpdateProgressUseCase {
  private progressRepository: IProgressRepository;
  constructor(progressRepository: IProgressRepository) {
    this.progressRepository = progressRepository;
  }

  async execute(
    userId: string,
    progressId: string,
    data: { materialId: string }
  ): Promise<ResponseModel> {
    try {
      const updatedProgress = await this.progressRepository.updateProgressById(
        progressId,
        data.materialId
      );
      if (!updatedProgress) {
        return {
          statusCode: 404,
          success: false,
          message: "The progress is doesn't exist!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: `The signed url is created successfully.`,
        data: updatedProgress,
      };
    } catch (error) {
      throw new Error("An Error when fetch the progress status!");
    }
  }
}

export default UpdateProgressUseCase;
