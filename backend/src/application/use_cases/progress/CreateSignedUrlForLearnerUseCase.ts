import { MaterialType } from "../../../shared/types";
import { ResponseModel } from "../../../shared/types/ResponseModel";
import { IProgressRepository } from "../../IRepositories/IProgressRepository";
import S3Service from "../../services/S3Service";

const s3Service = new S3Service();

class CreateSignedUrlForLearnerUseCase {
  private progressRepository: IProgressRepository;
  constructor(progressRepository: IProgressRepository) {
    this.progressRepository = progressRepository;
  }

  async execute(
    userId: string,
    progressId: string,
    data: { fileKey: string; materialType: MaterialType }
  ): Promise<ResponseModel> {
    try {
      const progress = await this.progressRepository.fetchProgressById(
        progressId
      );
      if (!progress || progress.userId !== userId) {
        return {
          statusCode: 404,
          success: false,
          message: "The progress is doesn't exist!",
        };
      }

      const url = await s3Service.getObjectUrl(data.fileKey, data.materialType);

      return {
        statusCode: 200,
        success: true,
        message: `The signed url is created successfully.`,
        data: url,
      };
    } catch (error) {
      throw new Error("An Error when fetch the progress status!");
    }
  }
}

export default CreateSignedUrlForLearnerUseCase;
