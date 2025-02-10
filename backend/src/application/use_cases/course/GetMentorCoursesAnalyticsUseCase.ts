import { ResponseModel } from "../../../shared/types/ResponseModel";
import ICourseRepository from "../../IRepositories/ICourseRepository";
import { IMentorRepository } from "../../IRepositories/IMentorRepository";

class GetMentorCoursesAnalyticsUseCase {
  private mentorRepository: IMentorRepository;
  private courseRepository: ICourseRepository;

  constructor(
    mentorRepository: IMentorRepository,
    courseRepository: ICourseRepository
  ) {
    this.mentorRepository = mentorRepository;
    this.courseRepository = courseRepository;
  }

  async execute(mentorId: string): Promise<ResponseModel> {
    try {
      const data = await this.mentorRepository.fetMentorCoursesAnalytics(
        mentorId
      );

      if (!data) {
        return {
          statusCode: 400,
          success: false,
          message: "The course didn't create!",
          data: [],
        };
      }
      return {
        statusCode: 201,
        success: true,
        message: "The courses is fetched successfully.",
        data,
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default GetMentorCoursesAnalyticsUseCase;
