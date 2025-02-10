import { ResponseModel } from "../../../shared/types/ResponseModel";
import ILessonRepository from "../../IRepositories/ILessonRepository";
import IMaterialRepository from "../../IRepositories/IMaterialRepository";

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

      const fetchedMaterials =
        await this.materialRepository.fetchMaterialsByMentorIds(materialIds);

      if (!fetchedMaterials) {
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
        data: { materials: fetchedMaterials },
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default GetMaterialsByLessonIdUseCase;
