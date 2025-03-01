import { ResponseModel } from "../../../shared/types/ResponseModel";
import Lesson from "../../entities/lesson.entity";
import ILessonRepository from "../../../infrastructures/database/repositories/interface/ILessonRepository";
import { LessonType } from "../../../shared/schemas/lesson.schema";

class UpdateLessonByIdUseCase {
  private lessonRepository: ILessonRepository;

  constructor(lessonRepository: ILessonRepository) {
    this.lessonRepository = lessonRepository;
  }

  async execute(
    data: Omit<LessonType, "duration">,
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
