import { CourseStatus } from "../../../shared/types";
import { ResponseModel } from "../../../shared/types/ResponseModel";
import ICourseRepository from "../../IRepositories/ICourseRepository";

class GetAllPublishedCoursesUseCase {
  private courseRepository: ICourseRepository;
  constructor(courseRepository: ICourseRepository) {
    this.courseRepository = courseRepository;
  }

  async execute(): Promise<ResponseModel> {
    try {
      const publishedCourse =
        await this.courseRepository.fetchAllCoursesByFilter({
          status: "published",
        });
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
