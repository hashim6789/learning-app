import { Model } from "mongoose";
import { IMeeting } from "../../interfaces/IMeeting";
import Meeting, {
  PopulateMeeting,
} from "../../../../application/entities/meeting.enitity.usecase";

interface IMeetingRepository {
  createMeeting(meeting: Meeting): Promise<Meeting>;

  getMeetingById(id: string): Promise<Meeting | null>;

  getAllMeetings(): Promise<Meeting[]>;
  getAllMeetingsByMentor(mentorId: string): Promise<PopulateMeeting[]>;
  getAllMeetingsByLearner(learnerId: string): Promise<PopulateMeeting[]>;
  updateMeeting(
    id: string,
    updatedMeeting: Partial<Meeting>
  ): Promise<Meeting | null>;

  deleteMeeting(id: string): Promise<Meeting | null>;
}

export default IMeetingRepository;
