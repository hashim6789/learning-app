import { ResponseModel } from "../../../shared/types/ResponseModel";
import ICourseRepository from "../../IRepositories/ICourseRepository";
import { IMentorRepository } from "../../IRepositories/IMentorRepository";

interface Payload {
  role: "admin" | "mentor" | "learner";
  email: string;
}

class GetAllCourseOfMentorUseCase {
  private courseRepository: ICourseRepository;
  private mentorRepository: IMentorRepository;

  constructor(
    courseRepository: ICourseRepository,
    mentorRepository: IMentorRepository
  ) {
    this.courseRepository = courseRepository;
    this.mentorRepository = mentorRepository;
  }

  async execute(mentorId: string): Promise<ResponseModel> {
    try {
      const mentor = await this.mentorRepository.fetchMentorById(mentorId);
      if (!mentor || mentor.isBlocked) {
        return {
          statusCode: 404,
          success: false,
          message: "The mentor is doesn't exist or blocked",
        };
      }

      const courses = await this.courseRepository.fetchAllCoursesByMentorId(
        mentorId
      );

      if (courses) {
        return {
          statusCode: 201,
          success: true,
          message: "The courses is fetched successfully.",
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

export default GetAllCourseOfMentorUseCase;
