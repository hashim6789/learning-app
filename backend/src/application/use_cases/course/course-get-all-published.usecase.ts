import { CourseStatus } from "../../../shared/types";
import { CourseLearnerQuery } from "../../../shared/types/filters";
import { ResponseModel } from "../../../shared/types/ResponseModel";
import ICourseRepository from "../../../infrastructures/database/repositories/interface/ICourseRepository";

class GetAllPublishedCoursesUseCase {
  private courseRepository: ICourseRepository;
  constructor(courseRepository: ICourseRepository) {
    this.courseRepository = courseRepository;
  }

  async execute(filter: CourseLearnerQuery): Promise<ResponseModel> {
    try {
      const publishedCourse =
        await this.courseRepository.fetchAllCoursesByFilter(
          "published",
          filter
        );
      if (!publishedCourse) {
        return {
          statusCode: 404,
          success: false,
          message: "The published courses is doesn't exist!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: `The published courses fetched successfully.`,
        data: publishedCourse,
      };
    } catch (error) {
      throw new Error("An Error when updating the course status!");
    }
  }
}

export default GetAllPublishedCoursesUseCase;
