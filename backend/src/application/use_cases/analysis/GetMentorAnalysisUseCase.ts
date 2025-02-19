import { CourseQuery } from "../../../shared/types/filters";
import { ResponseModel } from "../../../shared/types/ResponseModel";
import ICourseRepository from "../../IRepositories/ICourseRepository";
import { IMentorRepository } from "../../IRepositories/IMentorRepository";

class GetMentorAnalysisUseCase {
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
      const fetchedData = await this.courseRepository.analyzeCourse(mentorId);

      if (!fetchedData) {
        return {
          statusCode: 400,
          success: false,
          message: "The course didn't create!",
          data: [],
        };
      }
      return {
        statusCode: 200,
        success: true,
        message: "The mentor analysis successfully completed.",
        data: fetchedData,
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default GetMentorAnalysisUseCase;
