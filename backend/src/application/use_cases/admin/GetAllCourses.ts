import { ResponseModel } from "../../../shared/types/ResponseModel";
import ICourseRepository from "../../IRepositories/ICourseRepository";

interface Payload {
  role: "admin" | "mentor" | "learner";
  email: string;
}

class GetAllCourseUseCase {
  private courseRepository: ICourseRepository;

  constructor(courseRepository: ICourseRepository) {
    this.courseRepository = courseRepository;
  }

  async execute(): Promise<ResponseModel> {
    try {
      const courses = await this.courseRepository.fetchAllCourses();

      if (!courses) {
        return {
          statusCode: 404,
          success: false,
          message: "The mentors doesn't exist!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The mentors are fetched successfully.",
        data: courses,
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default GetAllCourseUseCase;
