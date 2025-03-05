import { getIo } from "../../../framework/socket/socketSetup";
import { generateUniqueKey } from "../../../shared/utils/uuid.util";
import IMeetingRepository from "../../../infrastructures/database/repositories/interface/IMeetingRepository";

class GetAllMeetOfMentorUseCase {
  private meetingRepository: IMeetingRepository;

  constructor(meetingRepository: IMeetingRepository) {
    this.meetingRepository = meetingRepository;
  }

  async execute(mentorId: string) {
    try {
      const fetchMeetings = await this.meetingRepository.getAllMeetingsByMentor(
        mentorId
      );

      if (!fetchMeetings) {
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
        data: fetchMeetings,
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default GetAllMeetOfMentorUseCase;
