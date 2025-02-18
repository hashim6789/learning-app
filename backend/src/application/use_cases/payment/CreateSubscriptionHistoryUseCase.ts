import { ResponseModel } from "../../../shared/types/ResponseModel";
import { validateData } from "../../../shared/helpers/validateHelper";
import { ISubscriptionHistoryRepository } from "../../IRepositories/ISubscriptionHistoryRepository";
import { CreateSubscriptionHistoryDTO } from "../../../shared/dtos/CreateSubscruiptionHistoryDTO";
import { ISubscriptionPlanRepository } from "../../IRepositories/ISubscriptionRepository";
import { SubscriptionHistory } from "../../entities/SubscriptionHistroy";

class CreateSubscriptionHistoryUseCase {
  private subscriptionPlanRepository: ISubscriptionPlanRepository;
  private subscriptionHistoryRepository: ISubscriptionHistoryRepository;

  constructor(
    subscriptionPlanRepository: ISubscriptionPlanRepository,
    subscriptionHistoryRepository: ISubscriptionHistoryRepository
  ) {
    this.subscriptionPlanRepository = subscriptionPlanRepository;
    this.subscriptionHistoryRepository = subscriptionHistoryRepository;
  }

  async execute(
    data: CreateSubscriptionHistoryDTO,
    userId: string
  ): Promise<ResponseModel> {
    try {
      await validateData(data, CreateSubscriptionHistoryDTO);

      const subscriptionPlan =
        await this.subscriptionPlanRepository.findSubscriptionPlanById(
          data.planId
        );
      if (!subscriptionPlan || !subscriptionPlan.id) {
        return {
          statusCode: 404,
          success: false,
          message: "The subscriptionPlan is not exist!",
        };
      }

      if (data.amount !== subscriptionPlan.price * 100) {
        return {
          statusCode: 400,
          success: false,
          message: "The subscription amount is not valid!",
        };
      }

      const history = new SubscriptionHistory(
        "",
        userId,
        subscriptionPlan.id,
        data.paymentIntentId,
        Date.now(),
        Date.now() + 1000 * 60 * 60 * 24 * 30 * subscriptionPlan.duration,
        data.status
      );
      const createSubscription =
        await this.subscriptionHistoryRepository.createSubscriptionHistory(
          history
        );
      if (!createSubscription) {
        return {
          statusCode: 400,
          success: false,
          message: "The subscription history is not created!",
        };
      }

      return {
        statusCode: 201,
        success: true,
        message: "The subscription history is created successfully.",
        data: createSubscription,
      };
    } catch (error) {
      throw new Error(
        "An error occurred while creating the subscriptionPlan: " +
          (error as string)
      );
    }
  }
}

export default CreateSubscriptionHistoryUseCase;
