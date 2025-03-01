import { SubscriptionPlan } from "../../../../application/entities/subsctiption-plan.entity";

export interface ISubscriptionPlanRepository {
  createSubscriptionPlan(
    data: SubscriptionPlan
  ): Promise<SubscriptionPlan | null>;
  findSubscriptionPlanById(id: string): Promise<SubscriptionPlan | null>;
  deleteSubscriptionPlanById(id: string): Promise<number>;
  fetchAllSubscriptionPlans(): Promise<SubscriptionPlan[] | null>;
}
