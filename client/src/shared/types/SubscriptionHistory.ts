export interface SubscriptionHistory {
  id: string;
  userId: string;
  planId: string;
  paymentIntentId: string;
  startDate: number;
  endDate: number;
  status: string;
}
