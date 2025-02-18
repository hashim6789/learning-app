import { ResponseModel } from "../../../shared/types/ResponseModel";
import ICourseRepository from "../../IRepositories/ICourseRepository";
import { IMentorRepository } from "../../IRepositories/IMentorRepository";
import { validateData } from "../../../shared/helpers/validateHelper";
import { IPurchaseHistoryRepository } from "../../IRepositories/IPurchaseHistoryRepository";
import { CreatePurchaseDTO } from "../../../shared/dtos/CreatePurshaseHistoryDTO";
import { PurchaseHistory } from "../../entities/PurchaseHistory";

class CreatePurchaseHistoryUseCase {
  private courseRepository: ICourseRepository;
  private purchaseHistoryRepository: IPurchaseHistoryRepository;
  private mentorRepository: IMentorRepository;

  constructor(
    courseRepository: ICourseRepository,
    mentorRepository: IMentorRepository,
    purchaseHistoryRepository: IPurchaseHistoryRepository
  ) {
    this.courseRepository = courseRepository;
    this.mentorRepository = mentorRepository;
    this.purchaseHistoryRepository = purchaseHistoryRepository;
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
      //   const mentorCoursesData =
      //     await this.courseRepository.fetchAllCoursesByMentorId(data.mentorId, {
      //       search: data.title,
      //     });

      //   if (mentorCoursesData && mentorCoursesData.courses.length > 0) {
      //     return {
      //       statusCode: 404,
      //       success: false,
      //       message:
      //         "The same named course is already exist on this mentor created course list!",
      //     };
      //   }

      //   // Create course with uppercase title (if required)
      //   const createdCourse = await this.courseRepository.createCourse(data);

      //   if (!createdCourse) {
      //     return {
      //       statusCode: 400,
      //       success: false,
      //       message: "The course creation failed!",
      //     };
      //   }

      //   if (!createdCourse.id) {
      //     return {
      //       statusCode: 400,
      //       success: false,
      //       message: "The courseId of created course is null!",
      //     };
      //   }

      //   // const updatedMentor = await this.mentorRepository.setCreatedCourseId(
      //   //   createdCourse.mentorId,
      //   //   createdCourse.id
      //   // );

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
