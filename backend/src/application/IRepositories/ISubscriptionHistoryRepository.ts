import { SubscriptionHistory } from "../entities/SubscriptionHistroy";

export interface ISubscriptionHistoryRepository {
  createSubscriptionHistory(
    data: SubscriptionHistory
  ): Promise<SubscriptionHistory | null>;
  findSubscriptionHistoryById(id: string): Promise<SubscriptionHistory | null>;
  findSubscriptionHistoryByUserId(
    userId: string
  ): Promise<SubscriptionHistory[]>;
  updateSubscriptionHistory(
    id: string,
    updateData: Partial<SubscriptionHistory>
  ): Promise<SubscriptionHistory | null>;
  deleteSubscriptionHistoryById(id: string): Promise<number>;
}
