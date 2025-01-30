import { ResponseModel } from "../../../shared/types/ResponseModel";
import ILessonRepository from "../../IRepositories/ILessonRepository";

class GetLessonByIdUseCase {
  private lessonRepository: ILessonRepository;

  constructor(lessonRepository: ILessonRepository) {
    this.lessonRepository = lessonRepository;
  }

  async execute(lessonId: string): Promise<ResponseModel> {
    try {
      const lesson = await this.lessonRepository.fetchLessonById(lessonId);
      if (!lesson) {
        return {
          statusCode: 404,
          success: false,
          message: "The lesson doesn't exist!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The lessons of the course is fetched successfully.",
        data: { lesson },
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default GetLessonByIdUseCase;
