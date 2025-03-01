import { ResponseModel } from "../../../shared/types/ResponseModel";
import ICourseRepository from "../../../infrastructures/database/repositories/interface/ICourseRepository";

class DeleteCourseUseCase {
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

      const deletedCourse = await this.courseRepository.deleteCourseById(
        courseId
      );
      if (!deletedCourse) {
        return {
          statusCode: 400,
          success: false,
          message: "The course deletion is failed!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The course is deleted successfully.",
        data: {
          course: deletedCourse,
        },
      };
    } catch (error) {
      throw new Error("An Error when deleting the course!");
    }
  }
}

export default DeleteCourseUseCase;
