import { getIo } from "../../../framework/socket/socketSetup";
import IMeetingRepository from "../../IRepositories/IMeetingRepository";

class AcceptMeetUseCase {
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
        console.log("join call", fetchMeeting.roomId);
        io.emit(`meet:join-${fetchMeeting.roomId}`, fetchMeeting);
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

export default AcceptMeetUseCase;
