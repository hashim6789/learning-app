import { ResponseModel } from "../../../shared/types/ResponseModel";
import { CreateCourseDTO } from "../../../shared/dtos/createCourseDTO";
import ICourseRepository from "../../IRepositories/ICourseRepository";
import { IMentorRepository } from "../../IRepositories/IMentorRepository";
import ValidateAccessTokenUseCase from "../mentor/ValidateAccessTokenUseCase"; // Import the access token validation use case
import { validateData } from "../../../shared/helpers/validateHelper";
import { IPurchaseHistoryRepository } from "../../IRepositories/IPurchaseHistoryRepository";
import { CreatePurchaseDTO } from "../../../shared/dtos/CreatePurshaseHistoryDTO";
import { PurchaseHistory } from "../../entities/PurchaseHistory";
import { ISubscriptionPlanRepository } from "../../IRepositories/ISubscriptionRepository";

class GetAllPlansUseCase {
  private subscriptionPlanRepository: ISubscriptionPlanRepository;

  constructor(subscriptionPlanRepository: ISubscriptionPlanRepository) {
    this.subscriptionPlanRepository = subscriptionPlanRepository;
  }

  async execute(): Promise<ResponseModel> {
    try {
      const plans =
        await this.subscriptionPlanRepository.fetchAllSubscriptionPlans();
      if (!plans) {
        return {
          statusCode: 404,
          success: false,
          message: "The history is not exist!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The purchase history is fetched successfully.",
        data: plans,
      };
    } catch (error) {
      throw new Error(
        "An error occurred while creating the course: " + (error as string)
      );
    }
  }
}

export default GetAllPlansUseCase;
