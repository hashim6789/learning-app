import { ResponseModel } from "../../../shared/types/ResponseModel";
import Course from "../../entities/Course";
import ICourseRepository from "../../IRepositories/ICourseRepository";
import { IMentorRepository } from "../../IRepositories/IMentorRepository";

interface Payload {
  role: "admin" | "mentor" | "learner";
  email: string;
}

class GetCourseOfMentorUseCase {
  private courseRepository: ICourseRepository;
  private mentorRepository: IMentorRepository;

  constructor(
    courseRepository: ICourseRepository,
    mentorRepository: IMentorRepository
  ) {
    this.courseRepository = courseRepository;
    this.mentorRepository = mentorRepository;
  }

  async execute(mentorId: string, courseId: string): Promise<ResponseModel> {
    try {
      const mentor = await this.mentorRepository.fetchMentorById(mentorId);
      if (!mentor || mentor.isBlocked) {
        return {
          statusCode: 404,
          success: false,
          message: "The mentor is doesn't exist or blocked",
        };
      }

      const course = await this.courseRepository.findCourseById(courseId);

      if (!course) {
        return {
          statusCode: 404,
          success: false,
          message: "The course doesn't exist!",
        };
      }

      if (course) {
        return {
          statusCode: 201,
          success: true,
          message: "The course is fetched successfully.",
          data: course,
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

export default GetCourseOfMentorUseCase;
