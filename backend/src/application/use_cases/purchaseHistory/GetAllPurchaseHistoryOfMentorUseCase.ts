import { ResponseModel } from "../../../shared/types/ResponseModel";
import { IPurchaseHistoryRepository } from "../../IRepositories/IPurchaseHistoryRepository";

class GetAllPurchaseHistoriesUseCase {
  private purchaseHistoryRepository: IPurchaseHistoryRepository;

  constructor(purchaseHistoryRepository: IPurchaseHistoryRepository) {
    this.purchaseHistoryRepository = purchaseHistoryRepository;
  }

  async execute(userId: string): Promise<ResponseModel> {
    try {
      const purchaseHistories =
        await this.purchaseHistoryRepository.findPurchaseHistoryByUserId(
          userId
        );
      if (!purchaseHistories) {
        return {
          statusCode: 404,
          success: false,
          message: "The history is not exist!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The purchase history is fetched successfully.",
        data: purchaseHistories,
      };
    } catch (error) {
      throw new Error(
        "An error occurred while creating the course: " + (error as string)
      );
    }
  }
}

export default GetAllPurchaseHistoriesUseCase;
