import { CourseStatus } from "../../../shared/types";
import { ResponseModel } from "../../../shared/types/ResponseModel";
import ICourseRepository from "../../../infrastructures/database/repositories/interface/ICourseRepository";

class GetCourseByIdUseCase {
  private courseRepository: ICourseRepository;
  constructor(courseRepository: ICourseRepository) {
    this.courseRepository = courseRepository;
  }

  async execute(courseId: string): Promise<ResponseModel> {
    try {
      const course = await this.courseRepository.findCourseById(courseId);
      if (!course) {
        return {
          statusCode: 404,
          success: false,
          message: "The course is doesn't exist!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: `The course fetched successfully.`,
        data: course,
      };
    } catch (error) {
      throw new Error("An Error when updating the course status!");
    }
  }
}

export default GetCourseByIdUseCase;
