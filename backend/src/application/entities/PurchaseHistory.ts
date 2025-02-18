export class PurchaseHistory {
  id;
  userId;
  courseId;
  paymentIntentId;
  purchaseDate;
  amount;
  status;
  constructor(
    id: string,
    userId: string,
    courseId: string,
    paymentIntentId: string,
    purchaseDate: number,
    amount: number,
    status: string
  ) {
    this.id = id;
    this.userId = userId;
    this.courseId = courseId;
    this.paymentIntentId = paymentIntentId;
    this.purchaseDate = purchaseDate;
    this.amount = amount;
    this.status = status;
  }
}
