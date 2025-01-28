import { ResponseModel } from "../../../shared/types/ResponseModel";
import { CreateMaterialDTO } from "../../../shared/dtos/CreateMaterialDTO";
import IMaterialRepository from "../../IRepositories/IMaterialRepository";

class CreateMaterialUseCase {
  private materialRepository: IMaterialRepository;

  constructor(materialRepository: IMaterialRepository) {
    this.materialRepository = materialRepository;
  }

  async execute(
    data: CreateMaterialDTO,
    mentorId: string
  ): Promise<ResponseModel> {
    try {
      const createdMaterial = await this.materialRepository.createMaterial(
        data,
        mentorId
      );
      if (!createdMaterial) {
        return {
          statusCode: 400,
          success: false,
          message: "The material creation is failed!",
        };
      }

      return {
        statusCode: 201,
        success: true,
        message: "The material created successfully.",
        data: {
          material: createdMaterial,
        },
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default CreateMaterialUseCase;
