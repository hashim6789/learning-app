import { getIo } from "../../../framework/socket/socketSetup";
import { generateUniqueKey } from "../../../shared/utils/uuid.util";
import IMeetingRepository from "../../IRepositories/IMeetingRepository";

class MeetStartUseCase {
  private meetingRepository: IMeetingRepository;

  constructor(meetingRepository: IMeetingRepository) {
    this.meetingRepository = meetingRepository;
  }

  async execute(meetingId: string) {
    try {
      const fetchMeeting = await this.meetingRepository.getMeetingById(
        meetingId
      );

      if (!fetchMeeting) {
        return {
          statusCode: 400,
          success: false,
          message: "The fetch materials is failed!",
        };
      }

      const io = getIo();
      if (io) {
        io.emit(`call:invite-${fetchMeeting.learnerId.toString()}`, {
          roomId: fetchMeeting.roomId,
          course: fetchMeeting.courseId,
          time: fetchMeeting.time,
          learnerId: fetchMeeting.learnerId,
          _id: fetchMeeting._id,
        });
      }

      return {
        statusCode: 200,
        success: true,
        message: "The material fetched successfully.",
        data: fetchMeeting,
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default MeetStartUseCase;
