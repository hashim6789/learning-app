import mongoose, { ObjectId } from "mongoose";
import { SubscriptionHistory } from "../../../application/entities/subscription-history.entity";
import { ISubscriptionHistoryRepository } from "./interface/ISubscriptionHistoryRepository";
import { ISubscriptionHistory } from "../interfaces/ISubscriptionHistory";
import SubscriptionHistoryModel from "../models/subscriptionHistoryModel";

class SubscriptionHistoryRepository implements ISubscriptionHistoryRepository {
  constructor() {}

  async createSubscriptionHistory(
    data: SubscriptionHistory
  ): Promise<SubscriptionHistory | null> {
    try {
      const history = new SubscriptionHistoryModel({
        userId: new mongoose.Types.ObjectId(data.userId),
        planId: new mongoose.Types.ObjectId(data.planId),
        paymentIntentId: data.paymentIntentId,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        status: data.status,
      });
      console.log(history);
      const createdHistory = await history.save();
      if (!createdHistory) return null;
      return mappedSubscriptionHistory(createdHistory);
    } catch (error) {
      throw new Error(
        "An error occurred while creating the subscription history"
      );
    }
  }

  async findSubscriptionHistoryById(
    id: string
  ): Promise<SubscriptionHistory | null> {
    try {
      const history = await SubscriptionHistoryModel.findById(id);
      if (!history) return null;
      return mappedSubscriptionHistory(history);
    } catch (error) {
      throw new Error(
        "An error occurred while fetching the subscription history"
      );
    }
  }

  async findSubscriptionHistoryByUserId(
    userId: string
  ): Promise<SubscriptionHistory[]> {
    try {
      const histories = await SubscriptionHistoryModel.find({
        userId,
        endDate: { $gt: Date.now() },
      });
      return histories.map(mappedSubscriptionHistory);
    } catch (error) {
      throw new Error(
        "An error occurred while fetching the subscription history by user ID"
      );
    }
  }

  async updateSubscriptionHistory(
    id: string,
    updateData: Partial<SubscriptionHistory>
  ): Promise<SubscriptionHistory | null> {
    try {
      const history = await SubscriptionHistoryModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );
      if (!history) return null;
      return mappedSubscriptionHistory(history);
    } catch (error) {
      throw new Error(
        "An error occurred while updating the subscription history"
      );
    }
  }

  async deleteSubscriptionHistoryById(id: string): Promise<number> {
    try {
      const result = await SubscriptionHistoryModel.deleteOne({ _id: id });
      return result.deletedCount;
    } catch (error) {
      throw new Error(
        "An error occurred while deleting the subscription history"
      );
    }
  }
}

function mappedSubscriptionHistory(
  data: ISubscriptionHistory
): SubscriptionHistory {
  return new SubscriptionHistory(
    data._id.toString(),
    data.userId.toString(),
    data.planId.toString(),
    data.paymentIntentId,
    data.startDate.getTime(),
    data.endDate.getTime(),
    data.status
  );
}

export default SubscriptionHistoryRepository;
