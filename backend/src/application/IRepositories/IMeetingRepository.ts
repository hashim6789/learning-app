import { Model } from "mongoose";
import { IMeeting } from "../../infrastructures/database/interfaces/IMeeting";

interface IMeetingRepository {
  createMeeting(meeting: IMeeting): Promise<IMeeting>;

  getMeetingById(id: string): Promise<IMeeting | null>;

  getAllMeetings(): Promise<IMeeting[]>;
  updateMeeting(
    id: string,
    updatedMeeting: Partial<IMeeting>
  ): Promise<IMeeting | null>;

  deleteMeeting(id: string): Promise<IMeeting | null>;
}

export default IMeetingRepository;
