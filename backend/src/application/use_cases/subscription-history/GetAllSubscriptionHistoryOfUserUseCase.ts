import { ResponseModel } from "../../../shared/types/ResponseModel";
import { ISubscriptionHistoryRepository } from "../../IRepositories/ISubscriptionHistoryRepository";

class GetAllSubscriptionHistoriesUseCase {
  private subscriptionHistoryRepository: ISubscriptionHistoryRepository;

  constructor(subscriptionHistoryRepository: ISubscriptionHistoryRepository) {
    this.subscriptionHistoryRepository = subscriptionHistoryRepository;
  }

  async execute(userId: string): Promise<ResponseModel> {
    try {
      const subscriptionHistories =
        await this.subscriptionHistoryRepository.findSubscriptionHistoryByUserId(
          userId
        );
      if (!subscriptionHistories) {
        return {
          statusCode: 404,
          success: false,
          message: "The history is not exist!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The subscription history is fetched successfully.",
        data: subscriptionHistories,
      };
    } catch (error) {
      throw new Error(
        "An error occurred while creating the course: " + (error as string)
      );
    }
  }
}

export default GetAllSubscriptionHistoriesUseCase;
