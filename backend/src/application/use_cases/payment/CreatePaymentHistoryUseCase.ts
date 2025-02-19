import { ResponseModel } from "../../../shared/types/ResponseModel";
import ICourseRepository from "../../IRepositories/ICourseRepository";
import { IMentorRepository } from "../../IRepositories/IMentorRepository";
import { validateData } from "../../../shared/helpers/validateHelper";
import { IPurchaseHistoryRepository } from "../../IRepositories/IPurchaseHistoryRepository";
import { CreatePurchaseDTO } from "../../../shared/dtos/CreatePurshaseHistoryDTO";
import { PurchaseHistory } from "../../entities/PurchaseHistory";
import { IProgressRepository } from "../../IRepositories/IProgressRepository";
import { Progress } from "../../entities/Progress";

class CreatePurchaseHistoryUseCase {
  private courseRepository: ICourseRepository;
  private purchaseHistoryRepository: IPurchaseHistoryRepository;
  private mentorRepository: IMentorRepository;
  private progressRepository: IProgressRepository;

  constructor(
    courseRepository: ICourseRepository,
    mentorRepository: IMentorRepository,
    purchaseHistoryRepository: IPurchaseHistoryRepository,
    progressRepository: IProgressRepository
  ) {
    this.courseRepository = courseRepository;
    this.mentorRepository = mentorRepository;
    this.purchaseHistoryRepository = purchaseHistoryRepository;
    this.progressRepository = progressRepository;
  }

  async execute(
    data: CreatePurchaseDTO,
    userId: string
  ): Promise<ResponseModel> {
    try {
      await validateData(data, CreatePurchaseDTO);

      const course = await this.courseRepository.findCourseById(data.courseId);
      if (!course || !course.id) {
        return {
          statusCode: 404,
          success: false,
          message: "The course is not exist!",
        };
      }

      const history = new PurchaseHistory(
        "",
        userId,
        course.id,
        data.paymentIntentId,
        Date.now(),
        data.amount,
        data.status
      );
      const createPurchase =
        await this.purchaseHistoryRepository.createPurchaseHistory(history);
      if (!createPurchase) {
        return {
          statusCode: 400,
          success: false,
          message: "The purchase history is not created!",
        };
      }

      const progress = new Progress(
        "",
        userId,
        course.id,
        [],
        [],
        false,
        0,
        null
      );

      const createdProgress = await this.progressRepository.createProgress(
        progress
      );
      if (!createdProgress) {
        return {
          statusCode: 400,
          success: false,
          message: "The progress course is not created!",
        };
      }

      return {
        statusCode: 201,
        success: true,
        message: "The purchase history is created successfully.",
        data: createPurchase,
      };
    } catch (error) {
      throw new Error(
        "An error occurred while creating the course: " + (error as string)
      );
    }
  }
}

export default CreatePurchaseHistoryUseCase;
