import { ResponseModel } from "../../../shared/types/ResponseModel";
import { CreateMaterialDTO } from "../../../shared/dtos/CreateMaterialDTO";
import IMaterialRepository from "../../IRepositories/IMaterialRepository";

class DeleteMaterialByIdUseCase {
  private materialRepository: IMaterialRepository;

  constructor(materialRepository: IMaterialRepository) {
    this.materialRepository = materialRepository;
  }

  async execute(materialId: string): Promise<ResponseModel> {
    try {
      const existingMaterial = await this.materialRepository.fetchMaterialById(
        materialId
      );
      if (!existingMaterial) {
        return {
          statusCode: 404,
          success: false,
          message: "The material doesn't exist!",
        };
      }
      const deletedMaterial = await this.materialRepository.deleteMaterialById(
        materialId
      );
      if (!deletedMaterial) {
        return {
          statusCode: 400,
          success: false,
          message: "The material update is failed!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The material deleted successfully.",
        data: {
          material: deletedMaterial,
        },
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default DeleteMaterialByIdUseCase;
