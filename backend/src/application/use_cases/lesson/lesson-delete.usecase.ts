import { ResponseModel } from "../../../shared/types/ResponseModel";
import ILessonRepository from "../../../infrastructures/database/repositories/interface/ILessonRepository";

class DeleteLessonByIdUseCase {
  private lessonRepository: ILessonRepository;

  constructor(lessonRepository: ILessonRepository) {
    this.lessonRepository = lessonRepository;
  }

  async execute(lessonId: string): Promise<ResponseModel> {
    try {
      const deleteLesson = await this.lessonRepository.deleteLessonById(
        lessonId
      );
      if (!deleteLesson) {
        return {
          statusCode: 400,
          success: false,
          message: "The lesson deletion is failed!",
        };
      }
      return {
        statusCode: 200,
        success: true,
        message: "The lesson is deleted successfully.",
        data: { lesson: deleteLesson },
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default DeleteLessonByIdUseCase;
