// src/adapters/controllers/PurchaseHistoryController.ts
import { Request, Response, NextFunction } from "express";
import PurchaseHistoryRepository from "../../infrastructures/database/repositories/PurchaseHistoryRepository";
import GetAllPurchaseHistoriesUseCase from "../../application/use_cases/purchaseHistory/GetAllPurchaseHistoryOfMentorUseCase";

const purchaseHistoryRepository = new PurchaseHistoryRepository();

const getAllPurchaseHistoriesUseCase = new GetAllPurchaseHistoriesUseCase(
  purchaseHistoryRepository
);

export class PurchaseHistoryController {
  constructor() {}

  async getPurchasesByLearnerId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.userId || "";
      // const userId = "679714e0a41657d40318789d";
      const response = await getAllPurchaseHistoriesUseCase.execute(userId);
      if (response.success && response.data) {
        res
          .status(200)
          .json({ message: response.message, data: response.data });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }
}
