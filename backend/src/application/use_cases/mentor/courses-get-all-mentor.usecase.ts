import { CourseQuery } from "../../../shared/types/filters";
import { ResponseModel } from "../../../shared/types/ResponseModel";
import ICourseRepository from "../../../infrastructures/database/repositories/interface/ICourseRepository";
import { IMentorRepository } from "../../../infrastructures/database/repositories/interface/IMentorRepository";

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

  async execute(mentorId: string, filter: CourseQuery): Promise<ResponseModel> {
    try {
      // const mentor = await this.mentorRepository.fetchById(mentorId);
      // if (!mentor || mentor.isBlocked) {
      //   return {
      //     statusCode: 404,
      //     success: false,
      //     message: "The mentor is doesn't exist or blocked",
      //   };
      // }

      const fetchedData = await this.courseRepository.fetchAllCoursesByMentorId(
        mentorId,
        filter
      );

      if (!fetchedData) {
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
        data: { courses: fetchedData.courses, docCount: fetchedData.docCount },
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default GetAllCourseOfMentorUseCase;
