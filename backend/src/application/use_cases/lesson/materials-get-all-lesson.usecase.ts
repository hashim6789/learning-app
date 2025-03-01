import { ResponseModel } from "../../../shared/types/ResponseModel";
import ILessonRepository from "../../../infrastructures/database/repositories/interface/ILessonRepository";
import IMaterialRepository from "../../../infrastructures/database/repositories/interface/IMaterialRepository";

class GetMaterialsByLessonIdUseCase {
  private lessonRepository: ILessonRepository;
  private materialRepository: IMaterialRepository;

  constructor(
    lessonRepository: ILessonRepository,
    materialRepository: IMaterialRepository
  ) {
    this.lessonRepository = lessonRepository;
    this.materialRepository = materialRepository;
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

      const materials = lesson.materials;
      const materialIds = materials
        ? materials.map((material) => material.id)
        : [];

      const fetchedData =
        await this.materialRepository.fetchMaterialsByMentorIds(materialIds);

      if (!fetchedData) {
        return {
          statusCode: 404,
          success: false,
          message: "The materials doesn't exist!",
        };
      }

      //   const materials = await this.materialRepository.
      return {
        statusCode: 200,
        success: true,
        message: "The lessons of the course is fetched successfully.",
        data: {
          materials: fetchedData.materials,
          docCount: fetchedData.docCount,
        },
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default GetMaterialsByLessonIdUseCase;
