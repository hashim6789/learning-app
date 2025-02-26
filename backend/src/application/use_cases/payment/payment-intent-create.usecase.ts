import { ResponseModel } from "../../../shared/types/ResponseModel";
import { CreateCourseDTO } from "../../../shared/dtos/createCourseDTO";
import ICourseRepository from "../../IRepositories/ICourseRepository";
import { IMentorRepository } from "../../IRepositories/IMentorRepository";
import ValidateAccessTokenUseCase from "../mentor/access-token-validate.usecase"; // Import the access token validation use case
import { validateData } from "../../../shared/helpers/validateHelper";
import { IPurchaseHistoryRepository } from "../../IRepositories/IPurchaseHistoryRepository";
import { CreatePurchaseDTO } from "../../../shared/dtos/CreatePurshaseHistoryDTO";
import { PurchaseHistory } from "../../entities/purchase-history.entity";

import Stripe from "stripe";
import { ISubscriptionPlanRepository } from "../../IRepositories/ISubscriptionRepository";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

type PurchaseType = "subscription" | "course";

class CreatePaymentIntentUseCase {
  private courseRepository: ICourseRepository;
  private subscriptionPlanRepository: ISubscriptionPlanRepository;

  constructor(
    courseRepository: ICourseRepository,
    subscriptionPlanRepository: ISubscriptionPlanRepository
  ) {
    this.courseRepository = courseRepository;
    this.subscriptionPlanRepository = subscriptionPlanRepository;
  }

  async execute(
    courseId: string,
    planId: string,
    type: PurchaseType
  ): Promise<ResponseModel> {
    let paymentIntent: null | Stripe.PaymentIntent = null;
    try {
      switch (type) {
        case "course":
          const course = await this.courseRepository.findCourseById(courseId);
          if (!course || !course.id) {
            return {
              statusCode: 404,
              success: false,
              message: "The course is not exist!",
            };
          }

          paymentIntent = await stripe.paymentIntents.create({
            amount: course.price * 100,
            currency: "usd",
          });

          break;

        case "subscription":
          const plan =
            await this.subscriptionPlanRepository.findSubscriptionPlanById(
              planId
            );
          if (!plan || !plan.id) {
            return {
              statusCode: 404,
              success: false,
              message: "The course is not exist!",
            };
          }

          paymentIntent = await stripe.paymentIntents.create({
            amount: plan.price * 100,
            currency: "usd",
          });
          break;

        default:
      }

      if (!paymentIntent) {
        return {
          statusCode: 400,
          success: false,
          message: "The purchase history is not created!",
        };
      }

      return {
        statusCode: 201,
        success: true,
        message: "The payment intent is created successfully.",
        data: paymentIntent,
      };
    } catch (error) {
      throw new Error(
        "An error occurred while creating the course: " + (error as string)
      );
    }
  }
}

export default CreatePaymentIntentUseCase;
