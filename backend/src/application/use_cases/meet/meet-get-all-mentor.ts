import { getIo } from "../../../framework/socket/socketSetup";
import { generateUniqueKey } from "../../../shared/utils/uuid.util";
import IMeetingRepository from "../../../infrastructures/database/repositories/interface/IMeetingRepository";
import { UserType } from "../../../shared/types";
import Meeting, {
  PopulateMeeting,
} from "../../entities/meeting.enitity.usecase";

class GetAllMeetOfMentorUseCase {
  private meetingRepository: IMeetingRepository;

  constructor(meetingRepository: IMeetingRepository) {
    this.meetingRepository = meetingRepository;
  }

  async execute(userId: string, role: UserType) {
    try {
      let fetchMeetings: PopulateMeeting[] | null = null;
      if (role === "mentor") {
        fetchMeetings = await this.meetingRepository.getAllMeetingsByMentor(
          userId
        );
      } else {
        fetchMeetings = await this.meetingRepository.getAllMeetingsByLearner(
          userId
        );
      }

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
