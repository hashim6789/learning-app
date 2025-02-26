import { ResponseModel } from "../../../shared/types/ResponseModel";
import { CreateMaterialDTO } from "../../../shared/dtos/CreateMaterialDTO";
import IMaterialRepository from "../../IRepositories/IMaterialRepository";
import { MaterialQuery } from "../../../shared/types/filters";

class GetMaterialsOfMentorUseCase {
  private materialRepository: IMaterialRepository;

  constructor(materialRepository: IMaterialRepository) {
    this.materialRepository = materialRepository;
  }

  async execute(
    mentorId: string,
    filter: MaterialQuery
  ): Promise<ResponseModel> {
    try {
      const fetchedData =
        await this.materialRepository.fetchMaterialsByMentorId(
          mentorId,
          filter
        );
      if (!fetchedData) {
        return {
          statusCode: 400,
          success: false,
          message: "The fetch materials is failed!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The material fetched successfully.",
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

export default GetMaterialsOfMentorUseCase;
