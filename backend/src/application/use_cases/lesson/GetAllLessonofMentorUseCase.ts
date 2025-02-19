import { LessonQuery } from "../../../shared/types/filters";
import { ResponseModel } from "../../../shared/types/ResponseModel";
import ILessonRepository from "../../IRepositories/ILessonRepository";

class GetAllLessonsOfMentorUseCase {
  private lessonRepository: ILessonRepository;

  constructor(lessonRepository: ILessonRepository) {
    this.lessonRepository = lessonRepository;
  }

  async execute(mentorId: string, filter: LessonQuery): Promise<ResponseModel> {
    try {
      const fetchedData = await this.lessonRepository.fetchAllLessonsByMentorId(
        mentorId,
        filter
      );
      if (!fetchedData) {
        return {
          statusCode: 404,
          success: false,
          message: "no lessons exist in this course!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The lessons of the course is fetched successfully.",
        data: { lessons: fetchedData.lessons, docCount: fetchedData.docCount },
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default GetAllLessonsOfMentorUseCase;
