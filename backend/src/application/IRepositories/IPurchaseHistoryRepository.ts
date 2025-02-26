import { PurchaseHistory } from "../entities/purchase-history.entity";

export interface IPurchaseHistoryRepository {
  createPurchaseHistory(data: PurchaseHistory): Promise<PurchaseHistory | null>;
  findPurchaseHistoryById(id: string): Promise<PurchaseHistory | null>;
  findPurchaseHistoryByUserId(userId: string): Promise<PurchaseHistory[]>;
  deletePurchaseHistoryById(id: string): Promise<number>;
}
