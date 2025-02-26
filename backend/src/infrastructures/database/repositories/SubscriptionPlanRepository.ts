import { SubscriptionPlan } from "../../../application/entities/subsctiption-plan.entity";
import { ISubscriptionPlanRepository } from "../../../application/IRepositories/ISubscriptionRepository";
import { ISubscriptionPlan } from "../interfaces/ISubscriptionPlan";
import SubscriptionPlanModel from "../models/SubscriptionPlanModel";

class SubscriptionPlanRepository implements ISubscriptionPlanRepository {
  constructor() {}

  async createSubscriptionPlan(
    data: SubscriptionPlan
  ): Promise<SubscriptionPlan | null> {
    try {
      const plan = new SubscriptionPlanModel(data);
      const createdPlan = await plan.save();
      if (!createdPlan) return null;
      return mappedSubscriptionPlan(createdPlan);
    } catch (error) {
      throw new Error("An error occurred while creating the subscription plan");
    }
  }

  async findSubscriptionPlanById(id: string): Promise<SubscriptionPlan | null> {
    try {
      const plan = await SubscriptionPlanModel.findById(id);
      if (!plan) return null;
      return mappedSubscriptionPlan(plan);
    } catch (error) {
      throw new Error("An error occurred while fetching the subscription plan");
    }
  }

  async deleteSubscriptionPlanById(id: string): Promise<number> {
    try {
      const result = await SubscriptionPlanModel.deleteOne({ _id: id });
      return result.deletedCount;
    } catch (error) {
      throw new Error("An error occurred while deleting the subscription plan");
    }
  }

  async fetchAllSubscriptionPlans(): Promise<SubscriptionPlan[] | null> {
    try {
      const plans = await SubscriptionPlanModel.find({});
      if (!plans) return null;
      return plans.map(mappedSubscriptionPlan);
    } catch (error) {
      throw new Error("An error occurred while deleting the subscription plan");
    }
  }
}

function mappedSubscriptionPlan(data: ISubscriptionPlan): SubscriptionPlan {
  return {
    id: data._id.toString(),
    title: data.title,
    duration: data.duration,
    price: data.price,
  };
}

export default SubscriptionPlanRepository;
