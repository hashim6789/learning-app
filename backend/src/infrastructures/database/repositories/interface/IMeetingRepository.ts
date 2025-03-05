import { Model } from "mongoose";
import { IMeeting } from "../../interfaces/IMeeting";

interface IMeetingRepository {
  createMeeting(meeting: IMeeting): Promise<IMeeting>;

  getMeetingById(id: string): Promise<IMeeting | null>;

  getAllMeetings(): Promise<IMeeting[]>;
  getAllMeetingsByMentor(mentorId: string): Promise<IMeeting[]>;
  updateMeeting(
    id: string,
    updatedMeeting: Partial<IMeeting>
  ): Promise<IMeeting | null>;

  deleteMeeting(id: string): Promise<IMeeting | null>;
}

export default IMeetingRepository;
