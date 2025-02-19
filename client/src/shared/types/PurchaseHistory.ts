export interface PurchaseHistory {
  userId: string;
  courseId: string;
  paymentIntentId: string;
  amount: number;
  status: string;
  purchaseDate: string;
}
