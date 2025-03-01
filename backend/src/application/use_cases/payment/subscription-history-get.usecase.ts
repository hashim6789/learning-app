import { ResponseModel } from "../../../shared/types/ResponseModel";

import { ISubscriptionHistoryRepository } from "../../../infrastructures/database/repositories/interface/ISubscriptionHistoryRepository";

class GetSubscriptionHistoryUseCase {
  private subscriptionHistoryRepository: ISubscriptionHistoryRepository;

  constructor(subscriptionHistoryRepository: ISubscriptionHistoryRepository) {
    this.subscriptionHistoryRepository = subscriptionHistoryRepository;
  }

  async execute(subscriptionId: string): Promise<ResponseModel> {
    try {
      const subscriptionHistory =
        await this.subscriptionHistoryRepository.findSubscriptionHistoryById(
          subscriptionId
        );
      if (!subscriptionHistory) {
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
        data: subscriptionHistory,
      };
    } catch (error) {
      throw new Error(
        "An error occurred while creating the course: " + (error as string)
      );
    }
  }
}

export default GetSubscriptionHistoryUseCase;
