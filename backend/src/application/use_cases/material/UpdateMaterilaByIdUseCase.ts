import { ResponseModel } from "../../../shared/types/ResponseModel";
import { CreateMaterialDTO } from "../../../shared/dtos/CreateMaterialDTO";
import IMaterialRepository from "../../IRepositories/IMaterialRepository";

class UpdateMaterialByIdUseCase {
  private materialRepository: IMaterialRepository;

  constructor(materialRepository: IMaterialRepository) {
    this.materialRepository = materialRepository;
  }

  async execute(
    data: CreateMaterialDTO,
    materialId: string
  ): Promise<ResponseModel> {
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
      const updatedMaterial = await this.materialRepository.updateMaterialById(
        materialId,
        data
      );
      if (!updatedMaterial) {
        return {
          statusCode: 400,
          success: false,
          message: "The material update is failed!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The material updated successfully.",
        data: {
          material: updatedMaterial,
        },
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default UpdateMaterialByIdUseCase;
