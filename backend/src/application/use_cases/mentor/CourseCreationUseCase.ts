import { ResponseModel } from "../../../shared/types/ResponseModel";
import { CreateCourseDTO } from "../../../shared/dtos/createCourseDTO";
import ICourseRepository from "../../IRepositories/ICourseRepository";
import { IMentorRepository } from "../../IRepositories/IMentorRepository";
import ValidateAccessTokenUseCase from "./ValidateAccessTokenUseCase"; // Import the access token validation use case
interface Payload {
  role: "admin" | "mentor" | "learner";
  email: string;
}
class CourseCreationUseCase {
  private courseRepository: ICourseRepository;
  private mentorRepository: IMentorRepository;

  constructor(
    courseRepository: ICourseRepository,
    mentorRepository: IMentorRepository
  ) {
    this.courseRepository = courseRepository;
    this.mentorRepository = mentorRepository;
  }

  async execute(data: CreateCourseDTO): Promise<ResponseModel> {
    try {
      const mentor = await this.mentorRepository.fetchMentorById(data.mentorId);

      if (!mentor) {
        return {
          statusCode: 404,
          success: false,
          message: "The mentor is doesn't exist",
        };
      }
      const createdCourse = await this.courseRepository.createCourse(data);

      if (createdCourse) {
        return {
          statusCode: 201,
          success: true,
          message: "The course is created successfully.",
          data: createdCourse,
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

export default CourseCreationUseCase;
