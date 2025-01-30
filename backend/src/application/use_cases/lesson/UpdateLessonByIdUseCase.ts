import { ResponseModel } from "../../../shared/types/ResponseModel";
import Lesson from "../../entities/Lesson";
import ILessonRepository from "../../IRepositories/ILessonRepository";

class UpdateLessonByIdUseCase {
  private lessonRepository: ILessonRepository;

  constructor(lessonRepository: ILessonRepository) {
    this.lessonRepository = lessonRepository;
  }

  async execute(
    data: Partial<Lesson>,
    lessonId: string
  ): Promise<ResponseModel> {
    try {
      const updateLesson = await this.lessonRepository.updateLessonById(
        lessonId,
        data
      );
      if (!updateLesson) {
        return {
          statusCode: 400,
          success: false,
          message: "The lesson update is failed!",
        };
      }
      return {
        statusCode: 201,
        success: true,
        message: "The lesson is updated successfully.",
        data: { lesson: updateLesson },
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default UpdateLessonByIdUseCase;
