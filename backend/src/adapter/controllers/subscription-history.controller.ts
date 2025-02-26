// src/adapters/controllers/SubscriptionHistoryController.ts
import { Request, Response, NextFunction } from "express";
import SubscriptionHistoryRepository from "../../infrastructures/database/repositories/SubscriptionHistoryRepository";
import GetAllSubscriptionHistoriesUseCase from "../../application/use_cases/subscription-history/subscitpion-history-get-all-user.usecase";

const subscriptionHistoryRepository = new SubscriptionHistoryRepository();

const getAllSubscriptionHistoriesUseCase =
  new GetAllSubscriptionHistoriesUseCase(subscriptionHistoryRepository);

export class SubscriptionHistoryController {
  constructor() {}

  async getSubscriptionsByLearnerId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.userId || "";
      // const userId = "679714e0a41657d40318789d";
      const response = await getAllSubscriptionHistoriesUseCase.execute(userId);
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
