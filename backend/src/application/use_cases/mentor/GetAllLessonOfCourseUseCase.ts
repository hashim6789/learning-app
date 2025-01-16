import { ResponseModel } from "../../../shared/types/ResponseModel";
import ILessonRepository from "../../IRepositories/ILessonRepository";

class GetAllLessonsOfCourseUseCase {
  private lessonRepository: ILessonRepository;

  constructor(lessonRepository: ILessonRepository) {
    this.lessonRepository = lessonRepository;
  }

  async execute(courseId: string): Promise<ResponseModel> {
    try {
      const lessons = await this.lessonRepository.fetchAllLessonsByCourseId(
        courseId
      );
      if (!lessons) {
        return {
          statusCode: 404,
          success: false,
          message: "no lessons exist in this course!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The lessons of the course is fetched successfully.",
        data: lessons,
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default GetAllLessonsOfCourseUseCase;
