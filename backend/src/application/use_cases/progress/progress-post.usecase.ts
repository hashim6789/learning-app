import { ResponseModel } from "../../../shared/types/ResponseModel";
import { IProgressRepository } from "../../../infrastructures/database/repositories/interface/IProgressRepository";
import { ISubscriptionHistoryRepository } from "../../../infrastructures/database/repositories/interface";
import { Progress } from "../../entities";

interface ProgressDTO {
  courseId: string;
  subscriptionId: string;
}

class CreateProgressUseCase {
  private progressRepository: IProgressRepository;
  private subscriptionHistoryRepository: ISubscriptionHistoryRepository;
  constructor(
    progressRepository: IProgressRepository,
    subscriptionHistoryRepository: ISubscriptionHistoryRepository
  ) {
    this.progressRepository = progressRepository;
    this.subscriptionHistoryRepository = subscriptionHistoryRepository;
  }

  async execute(userId: string, data: ProgressDTO): Promise<ResponseModel> {
    try {
      const subscription =
        await this.subscriptionHistoryRepository.findSubscriptionHistoryById(
          data.subscriptionId
        );
      if (!subscription || subscription.endDate < Date.now()) {
        return {
          statusCode: 404,
          success: false,
          message: "The subscription is not valid!",
        };
      }

      const existingCourseProgress =
        await this.progressRepository.getProgressByUserAndCourse(
          userId,
          data.courseId
        );
      if (existingCourseProgress) {
        return {
          statusCode: 200,
          success: true,
          message: "The course is already enrolled.",
          data: existingCourseProgress,
        };
      }

      const progress = new Progress(
        "",
        userId,
        data.courseId,
        [],
        [],
        false,
        0,
        null
      );

      const createdProgress = await this.progressRepository.createProgress(
        progress
      );

      if (!createdProgress) {
        return {
          statusCode: 400,
          success: false,
          message: "The progress course is not created!",
        };
      }

      return {
        statusCode: 201,
        success: true,
        message: "The purchase history is created successfully.",
        data: createdProgress,
      };
    } catch (error) {
      throw new Error("An Error when fetch the progress status!");
    }
  }
}

export default CreateProgressUseCase;
