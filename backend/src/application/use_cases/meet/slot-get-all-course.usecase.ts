import { ResponseModel } from "../../../shared/types/ResponseModel";
import { ISlotRepository } from "../../../infrastructures/database/repositories/interface/ISlotRepository";

class GetSlotsOfCourseUseCase {
  private slotRepository: ISlotRepository;

  constructor(slotRepository: ISlotRepository) {
    this.slotRepository = slotRepository;
  }

  async execute(courseId: string): Promise<ResponseModel> {
    try {
      const fetchSlots = await this.slotRepository.getSlotsByCourse(courseId);
      if (!fetchSlots) {
        return {
          statusCode: 404,
          success: false,
          message: "The slots not found",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The slot created successfully.",
        data: fetchSlots,
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default GetSlotsOfCourseUseCase;
