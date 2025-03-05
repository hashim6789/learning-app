import { ResponseModel } from "../../../shared/types/ResponseModel";
import { ISlotRepository } from "../../../infrastructures/database/repositories/interface/ISlotRepository";
import { CreateSlotDTO } from "../../../shared/dtos/CreateSlotDTO";

class AddSlotUseCase {
  private slotRepository: ISlotRepository;

  constructor(slotRepository: ISlotRepository) {
    this.slotRepository = slotRepository;
  }

  async execute(data: CreateSlotDTO, mentorId: string): Promise<ResponseModel> {
    try {
      const createdSlot = await this.slotRepository.createSlot(data);
      if (!createdSlot) {
        return {
          statusCode: 400,
          success: false,
          message: "The slot creation is failed!",
        };
      }

      return {
        statusCode: 201,
        success: true,
        message: "The slot created successfully.",
        data: createdSlot,
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default AddSlotUseCase;
