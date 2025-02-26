import { PurchaseHistory } from "../../../application/entities/purchase-history.entity";
import { IPurchaseHistoryRepository } from "../../../application/IRepositories/IPurchaseHistoryRepository";
import { IPurchaseHistory } from "../interfaces/IPurchaseHistory";
import PurchaseHistoryModel from "../models/PurchaseHistoryModel";

class PurchaseHistoryRepository implements IPurchaseHistoryRepository {
  constructor() {}

  async createPurchaseHistory(
    data: PurchaseHistory
  ): Promise<PurchaseHistory | null> {
    try {
      const history = new PurchaseHistoryModel(data);
      const createdHistory = await history.save();
      if (!createdHistory) return null;
      return mappedPurchaseHistory(createdHistory);
    } catch (error) {
      throw new Error("An error occurred while creating the purchase history");
    }
  }

  async findPurchaseHistoryById(id: string): Promise<PurchaseHistory | null> {
    try {
      const history = await PurchaseHistoryModel.findById(id);
      if (!history) return null;
      return mappedPurchaseHistory(history);
    } catch (error) {
      throw new Error("An error occurred while fetching the purchase history");
    }
  }

  async findPurchaseHistoryByUserId(
    userId: string
  ): Promise<PurchaseHistory[]> {
    try {
      const histories = await PurchaseHistoryModel.find({ userId });
      return histories.map(mappedPurchaseHistory);
    } catch (error) {
      throw new Error(
        "An error occurred while fetching the purchase history by user ID"
      );
    }
  }

  async deletePurchaseHistoryById(id: string): Promise<number> {
    try {
      const result = await PurchaseHistoryModel.deleteOne({ _id: id });
      return result.deletedCount;
    } catch (error) {
      throw new Error("An error occurred while deleting the purchase history");
    }
  }
}

function mappedPurchaseHistory(data: IPurchaseHistory): PurchaseHistory {
  return {
    id: data._id.toString(),
    userId: data.userId.toString(),
    courseId: data.courseId.toString(),
    purchaseDate: data.purchaseDate.getTime(),
    paymentIntentId: data.paymentIntentId,
    amount: data.amount,
    status: data.status,
  };
}

export default PurchaseHistoryRepository;
