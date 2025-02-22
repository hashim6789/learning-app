import { Request, Response, NextFunction } from "express";

//imported the repositories
import CategoryRepository from "../../infrastructures/database/repositories/CategoryRepository";

//imported the use cases
import GetCategoriesUseCase from "../../application/use_cases/admin/GetCategoriesUseCase";
import CreateCategoryUseCase from "../../application/use_cases/admin/CreateCategoryUseCase";
import ListUnListCategoryUseCase from "../../application/use_cases/admin/ListUnlistCategoryUseCase";
import UpdateCategoryUseCase from "../../application/use_cases/admin/UpdateCategoryUseCase";
import { ResponseModel } from "../../shared/types/ResponseModel";
import Course from "../../application/entities/Course";
import CourseRepository from "../../infrastructures/database/repositories/CourseRepository";
import GetAllPublishedCoursesUseCase from "../../application/use_cases/course/GetAllPublishedCoursesUseCase";
import GetPublishedCourseUseCase from "../../application/use_cases/course/GetPublishedcourseUseCase";
import CreatePurchaseHistoryUseCase from "../../application/use_cases/payment/CreatePaymentHistoryUseCase";
import MentorRepository from "../../infrastructures/database/repositories/MentorRepository";
import PurchaseHistoryRepository from "../../infrastructures/database/repositories/PurchaseHistoryRepository";
import GetPurchaseHistoryUseCase from "../../application/use_cases/payment/GetPurchaseHistoryUseCase";
import CreatePaymentIntentUseCase from "../../application/use_cases/payment/CreatePaymentIntent";
import SubscriptionPlanRepository from "../../infrastructures/database/repositories/SubscriptionPlanRepository";
import CreateSubscriptionHistoryUseCase from "../../application/use_cases/payment/CreateSubscriptionHistoryUseCase";
import SubscriptionHistoryRepository from "../../infrastructures/database/repositories/SubscriptionHistoryRepository";
import GetSubscriptionHistoryUseCase from "../../application/use_cases/payment/GetSubscriptonHistoryUseCase";
import ProgressRepository from "../../infrastructures/database/repositories/ProgressRepository";
import GroupChatRepository from "../../infrastructures/database/repositories/GroupChatRepository";

//created the instances
const courseRepository = new CourseRepository();
const mentorRepository = new MentorRepository();
const purchaseHistoryRepository = new PurchaseHistoryRepository();
const subscriptionHistoryRepository = new SubscriptionHistoryRepository();
const subscriptionPlanRepository = new SubscriptionPlanRepository();
const progressRepository = new ProgressRepository();
const groupChatRepository = new GroupChatRepository();

const createPurchaseHistoryUseCase = new CreatePurchaseHistoryUseCase(
  courseRepository,
  mentorRepository,
  purchaseHistoryRepository,
  progressRepository,
  groupChatRepository
);

const getPurchaseHistoryUseCase = new GetPurchaseHistoryUseCase(
  purchaseHistoryRepository
);
const getSubscriptionHistoryUseCase = new GetSubscriptionHistoryUseCase(
  subscriptionHistoryRepository
);

const createPaymentIntentUseCase = new CreatePaymentIntentUseCase(
  courseRepository,
  subscriptionPlanRepository
);

const createSubscriptionHistoryUseCase = new CreateSubscriptionHistoryUseCase(
  subscriptionPlanRepository,
  subscriptionHistoryRepository
);

//mentor controller
class PaymentController {
  //get published courses
  async createPaymentIntent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { courseId, planId, type } = req.body;
      const response = await createPaymentIntentUseCase.execute(
        courseId,
        planId,
        type
      );

      if (response && response.statusCode === 201 && response.data) {
        res
          .status(201)
          .json({ message: response.message, data: response.data });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }

  async createPaymentHistory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.userId || "";

      const response = await createPurchaseHistoryUseCase.execute(
        req.body,
        userId
      );

      res.status(200).json({
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  }
  async createSubscriptionHistory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.userId || "";

      const response = await createSubscriptionHistoryUseCase.execute(
        req.body,
        userId
      );
      res.status(200).json({
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  }
  async getPaymentHistory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { purchaseId } = req.params;

      const response = await getPurchaseHistoryUseCase.execute(purchaseId);
      if (response && response.data) {
        res.status(200).json({
          message: response.message,
          data: response.data,
        });
      } else {
        res.status(400).json({
          message: response.message,
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async getSubscriptionHistory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { subscriptionId } = req.params;

      const response = await getSubscriptionHistoryUseCase.execute(
        subscriptionId
      );

      if (response && response.data) {
        res.status(200).json({
          message: response.message,
          data: response.data,
        });
      } else {
        res.status(400).json({
          message: response.message,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default PaymentController;
