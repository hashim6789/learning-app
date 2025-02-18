export class SubscriptionHistory {
  id;
  userId;
  planId;
  paymentIntentId;
  startDate;
  endDate;
  status;
  constructor(
    id: string,
    userId: string,
    planId: string,
    paymentIntentId: string,
    startDate: number,
    endDate: number,
    status: string
  ) {
    this.id = id;
    this.userId = userId;
    this.planId = planId;
    this.paymentIntentId = paymentIntentId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
  }
}
