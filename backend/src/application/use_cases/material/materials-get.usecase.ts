import { ResponseModel } from "../../../shared/types/ResponseModel";
import { CreateMaterialDTO } from "../../../shared/dtos/CreateMaterialDTO";
import IMaterialRepository from "../../IRepositories/IMaterialRepository";

class GetMateriaByIdUseCase {
  private materialRepository: IMaterialRepository;

  constructor(materialRepository: IMaterialRepository) {
    this.materialRepository = materialRepository;
  }

  async execute(mentorId: string): Promise<ResponseModel> {
    try {
      const fetchedMaterial = await this.materialRepository.fetchMaterialById(
        mentorId
      );
      if (!fetchedMaterial) {
        return {
          statusCode: 404,
          success: false,
          message: "The material is not exist!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The material fetched successfully.",
        data: {
          material: fetchedMaterial,
        },
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default GetMateriaByIdUseCase;
