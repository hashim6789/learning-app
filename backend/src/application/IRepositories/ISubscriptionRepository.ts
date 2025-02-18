import { SubscriptionPlan } from "../entities/SubcriptionPlan";

export interface ISubscriptionPlanRepository {
  createSubscriptionPlan(
    data: SubscriptionPlan
  ): Promise<SubscriptionPlan | null>;
  findSubscriptionPlanById(id: string): Promise<SubscriptionPlan | null>;
  deleteSubscriptionPlanById(id: string): Promise<number>;
  fetchAllSubscriptionPlans(): Promise<SubscriptionPlan[] | null>;
}
