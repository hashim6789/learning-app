export class SubscriptionPlan {
  id;
  title;
  duration;
  price;
  constructor(id: string, title: string, duration: number, price: number) {
    this.id = id;
    this.title = title;
    this.duration = duration;
    this.price = price;
  }
}
