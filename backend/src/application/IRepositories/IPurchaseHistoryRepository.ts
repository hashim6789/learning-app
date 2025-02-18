import { PurchaseHistory } from "../entities/PurchaseHistory";

export interface IPurchaseHistoryRepository {
  createPurchaseHistory(data: PurchaseHistory): Promise<PurchaseHistory | null>;
  findPurchaseHistoryById(id: string): Promise<PurchaseHistory | null>;
  findPurchaseHistoryByUserId(userId: string): Promise<PurchaseHistory[]>;
  deletePurchaseHistoryById(id: string): Promise<number>;
}
