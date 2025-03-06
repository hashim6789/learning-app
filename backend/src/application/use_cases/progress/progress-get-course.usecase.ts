import { ResponseModel } from "../../../shared/types/ResponseModel";
import { IProgressRepository } from "../../../infrastructures/database/repositories/interface/IProgressRepository";
import {
  IPurchaseHistoryRepository,
  ISubscriptionHistoryRepository,
} from "../../../infrastructures/database/repositories/interface";
import { log } from "console";

class GetProgressOfCourseUseCase {
  private progressRepository: IProgressRepository;
  private subscriptionRepository: ISubscriptionHistoryRepository;
  private purchaseHistoryRepository: IPurchaseHistoryRepository;
  constructor(
    progressRepository: IProgressRepository,
    subscriptionRepository: ISubscriptionHistoryRepository,
    purchaseHistoryRepository: IPurchaseHistoryRepository
  ) {
    this.progressRepository = progressRepository;
    this.subscriptionRepository = subscriptionRepository;
    this.purchaseHistoryRepository = purchaseHistoryRepository;
  }

  async execute(userId: string, progressId: string): Promise<ResponseModel> {
    try {
      const progress = await this.progressRepository.fetchProgressById(
        progressId
      );
      if (!progress) {
        return {
          statusCode: 404,
          success: false,
          message: "The progress is not exist!",
        };
      }

      const subscriptions =
        await this.subscriptionRepository.findSubscriptionHistoryByUserId(
          userId
        );
      const purchases =
        await this.purchaseHistoryRepository.findPurchaseHistoryByUserId(
          userId
        );

      console.log(subscriptions);
      console.log(purchases);

      if (
        !(
          subscriptions &&
          subscriptions.length > 0 &&
          subscriptions.some((item) => item.endDate > Date.now())
        ) &&
        !(
          purchases &&
          purchases.length > 0 &&
          purchases.some((item) => item.courseId === progress.courseId)
        )
      ) {
        return {
          statusCode: 400,
          success: false,
          message:
            "The course is not purchased or no valid subscription is available",
        };
      }
      const courseProgressDetails =
        await this.progressRepository.fetchCourseProgressDetails(
          userId,
          progress.id
        );
      if (!courseProgressDetails) {
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
        data: courseProgressDetails,
      };
    } catch (error) {
      throw new Error("An Error when fetch the progress status!");
    }
  }
}

export default GetProgressOfCourseUseCase;
