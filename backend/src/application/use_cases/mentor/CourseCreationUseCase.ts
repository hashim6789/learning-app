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
          message: "The mentor doesn't exist",
        };
      }

      const title = data.title.trim().toLowerCase();

      const existingCourse = await this.courseRepository.findCourseByTitle(
        title
      );
      if (existingCourse) {
        return {
          statusCode: 400,
          success: false,
          message: "The course title already exists!",
        };
      }

      // Create course with uppercase title (if required)
      const createdCourse = await this.courseRepository.createCourse({
        ...data,
        title: data.title.toUpperCase(), // Keeping uppercase as per your logic
      });

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
          message: "The course creation failed!",
        };
      }
    } catch (error) {
      throw new Error(
        "An error occurred while creating the course: " + (error as string)
      );
    }
  }
}

export default CourseCreationUseCase;
