import { ResponseModel } from "../../../shared/types/ResponseModel";
import { CreateMaterialDTO } from "../../../shared/dtos/CreateMaterialDTO";
import IMaterialRepository from "../../IRepositories/IMaterialRepository";

class GetMaterialsOfMentorUseCase {
  private materialRepository: IMaterialRepository;

  constructor(materialRepository: IMaterialRepository) {
    this.materialRepository = materialRepository;
  }

  async execute(mentorId: string): Promise<ResponseModel> {
    try {
      const fetchedMaterials =
        await this.materialRepository.fetchMaterialsByMentorId(mentorId);
      if (!fetchedMaterials) {
        return {
          statusCode: 400,
          success: false,
          message: "The material creation is failed!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The material fetched successfully.",
        data: {
          materials: fetchedMaterials,
        },
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default GetMaterialsOfMentorUseCase;
