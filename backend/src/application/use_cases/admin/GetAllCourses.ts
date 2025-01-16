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

      if (courses) {
        return {
          statusCode: 201,
          success: true,
          message: "The course is created successfully.",
          data: courses,
        };
      } else {
        return {
          statusCode: 400,
          success: false,
          message: "The course didn't create!",
        };
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default GetAllCourseUseCase;
