import { ResponseModel } from "../../../shared/types/ResponseModel";
import { ISlotRepository } from "../../../infrastructures/database/repositories/interface/ISlotRepository";
import IMeetingRepository from "../../../infrastructures/database/repositories/interface/IMeetingRepository";
import { IMeeting } from "../../../infrastructures/database/interfaces/IMeeting";
import Meeting from "../../entities/meeting.enitity.usecase";
import { generateUniqueKey } from "../../../shared/utils";

class BookSlotUseCase {
  private slotRepository: ISlotRepository;
  private meetingRepository: IMeetingRepository;

  constructor(
    slotRepository: ISlotRepository,
    meetingRepository: IMeetingRepository
  ) {
    this.slotRepository = slotRepository;
    this.meetingRepository = meetingRepository;
  }

  async execute(
    userId: string,
    slotId: string,
    courseId: string
  ): Promise<ResponseModel> {
    try {
      const fetchSlot = await this.slotRepository.getSlotById(slotId);
      if (!fetchSlot || fetchSlot.isBooked) {
        return {
          statusCode: 404,
          success: false,
          message: "The slot is not available",
        };
      }

      const bookedSlot = await this.slotRepository.bookSlot(slotId);

      if (!bookedSlot) {
        return {
          statusCode: 404,
          success: false,
          message: "The slot can't be booked",
        };
      }

      const newMeet = new Meeting(
        "",
        courseId,
        fetchSlot.mentorId,
        userId,
        generateUniqueKey(),
        bookedSlot.id
      );

      const createdMeet = await this.meetingRepository.createMeeting(newMeet);

      return {
        statusCode: 200,
        success: true,
        message: "The slot created successfully.",
        data: bookedSlot,
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default BookSlotUseCase;
