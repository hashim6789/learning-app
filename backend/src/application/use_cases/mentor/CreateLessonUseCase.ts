import { ResponseModel } from "../../../shared/types/ResponseModel";
import { CreateCourseDTO } from "../../../shared/dtos/createCourseDTO";
import { CreateLessonDTO } from "../../../shared/dtos/createLessonDTO";
import Lesson from "../../entities/Lesson";
import ICourseRepository from "../../IRepositories/ICourseRepository";
import ILessonRepository from "../../IRepositories/ILessonRepository";
import { IMentorRepository } from "../../IRepositories/IMentorRepository";
import ValidateAccessTokenUseCase from "./ValidateAccessTokenUseCase"; // Import the access token validation use case
interface Payload {
  role: "admin" | "mentor" | "learner";
  email: string;
}
class CreateLessonUseCase {
  private lessonRepository: ILessonRepository;
  private courseRepository: ICourseRepository;

  constructor(
    lessonRepository: ILessonRepository,
    courseRepository: ICourseRepository
  ) {
    this.lessonRepository = lessonRepository;
    this.courseRepository = courseRepository;
  }

  async execute(
    data: CreateLessonDTO,
    mentorId: string
  ): Promise<ResponseModel> {
    try {
      // const course = await this.courseRepository.findCourseById(data.courseId);
      // if (!course) {
      //   return {
      //     statusCode: 404,
      //     success: false,
      //     message: "The lesson's course is doesn't exist!",
      //   };
      // }

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

      // const updatedCourse = await this.courseRepository.addLessonsToCourse(
      //   data.courseId,
      //   createdLesson.courseId
      // );

      // if (updatedCourse) {
      //   return {
      //     statusCode: 201,
      //     success: true,
      //     message: "The lesson is created successfully.",
      //     data: updatedCourse,
      //   };
      // } else {
      //   return {
      //     statusCode: 400,
      //     success: false,
      //     message: "The lesson didn't create!",
      //   };
      // }
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default CreateLessonUseCase;
