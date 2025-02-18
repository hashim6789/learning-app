import { ResponseModel } from "../../../shared/types/ResponseModel";

import { IPurchaseHistoryRepository } from "../../IRepositories/IPurchaseHistoryRepository";

class GetPurchaseHistoryUseCase {
  private purchaseHistoryRepository: IPurchaseHistoryRepository;

  constructor(purchaseHistoryRepository: IPurchaseHistoryRepository) {
    this.purchaseHistoryRepository = purchaseHistoryRepository;
  }

  async execute(purchaseId: string): Promise<ResponseModel> {
    try {
      const purchaseHistory =
        await this.purchaseHistoryRepository.findPurchaseHistoryById(
          purchaseId
        );
      if (!purchaseHistory) {
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
        data: purchaseHistory,
      };
    } catch (error) {
      throw new Error(
        "An error occurred while creating the course: " + (error as string)
      );
    }
  }
}

export default GetPurchaseHistoryUseCase;
