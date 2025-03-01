import { ResponseModel } from "../../../shared/types/ResponseModel";
import { CreateCourseDTO } from "../../../shared/dtos/createCourseDTO";
import { CreateLessonDTO } from "../../../shared/dtos/createLessonDTO";
import Lesson from "../../entities/lesson.entity";
import ICourseRepository from "../../../infrastructures/database/repositories/interface/ICourseRepository";
import ILessonRepository from "../../../infrastructures/database/repositories/interface/ILessonRepository";
import { IMentorRepository } from "../../../infrastructures/database/repositories/interface/IMentorRepository";
import { LessonType } from "../../../shared/schemas/lesson.schema";
// import ValidateAccessTokenUseCase from "./ValidateAccessTokenUseCase"; // Import the access token validation use case
interface Payload {
  role: "admin" | "mentor" | "learner";
  email: string;
}
class CreateLessonUseCase {
  private lessonRepository: ILessonRepository;

  constructor(lessonRepository: ILessonRepository) {
    this.lessonRepository = lessonRepository;
  }

  async execute(
    data: Omit<LessonType, "duration">,
    mentorId: string
  ): Promise<ResponseModel> {
    try {
      const existingLesson =
        await this.lessonRepository.fetchMentorLessonByTitle(
          mentorId,
          data.title
        );

      if (existingLesson) {
        return {
          statusCode: 400,
          success: false,
          message: "The lesson is exist on this title!",
        };
      }

      const createdLesson = await this.lessonRepository.createLesson(
        data,
        mentorId
      );
      if (!createdLesson) {
        return {
          statusCode: 400,
          success: false,
          message: "The lesson creation is failed!",
        };
      }
      return {
        statusCode: 201,
        success: true,
        message: "The lesson is created successfully.",
        data: { lesson: createdLesson },
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default CreateLessonUseCase;
