import { CourseStatus } from "../../../shared/types";
import { ResponseModel } from "../../../shared/types/ResponseModel";
import ICourseRepository from "../../IRepositories/ICourseRepository";

class GetPublishedCourseUseCase {
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

      if (course.status !== "published") {
        return {
          statusCode: 400,
          success: false,
          message: "The course is not published!",
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

export default GetPublishedCourseUseCase;
