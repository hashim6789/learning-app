import { Document, Model } from "mongoose";
import { IMeeting } from "../interfaces/IMeeting";
import MeetingModel from "../models/MeetingModel"; // Adjust the import path as needed
import IMeetingRepository from "./interface/IMeetingRepository";
import Meeting, {
  PopulateMeeting,
} from "../../../application/entities/meeting.enitity.usecase";

class MeetingRepository implements IMeetingRepository {
  private model: Model<IMeeting>;

  constructor() {
    this.model = MeetingModel;
  }

  async createMeeting(meeting: Meeting): Promise<Meeting> {
    try {
      const newMeeting = new this.model(meeting);
      const createdMeeting = await newMeeting.save();
      return this.mapToMeeting(createdMeeting);
    } catch (error: any) {
      throw new Error(`Error creating meeting: ${error.message}`);
    }
  }

  async getMeetingById(id: string): Promise<Meeting | null> {
    try {
      const meet = await this.model.findById(id).populate("courseId").exec();
      return meet ? this.mapToMeeting(meet) : null;
    } catch (error: any) {
      throw new Error(`Error getting meeting by ID: ${error.message}`);
    }
  }

  async getAllMeetings(): Promise<Meeting[]> {
    try {
      const meetings = await this.model.find().exec();
      return meetings.map(this.mapToMeeting);
    } catch (error: any) {
      throw new Error(`Error getting all meetings: ${error.message}`);
    }
  }

  async getAllMeetingsByMentor(mentorId: string): Promise<PopulateMeeting[]> {
    try {
      const meetings = await this.model
        .find({ mentorId })
        .populate("courseId", "title")
        .populate("slotId", "dateTime")
        .populate("learnerId", "firstName lastName")
        .populate("mentorId", "firstName lastName")
        .exec();

      return meetings.map(this.mapToPopulateMeeting);
    } catch (error: any) {
      throw new Error(`Error getting all meetings by mentor: ${error.message}`);
    }
  }

  async getAllMeetingsByLearner(learnerId: string): Promise<PopulateMeeting[]> {
    try {
      const meetings = await this.model
        .find({ learnerId })
        .populate("courseId", "title")
        .populate("slotId", "dateTime")
        .populate("learnerId", "firstName lastName")
        .populate("mentorId", "firstName lastName")
        .exec();

      return meetings.map(this.mapToPopulateMeeting);
    } catch (error: any) {
      throw new Error(`Error getting all meetings by mentor: ${error.message}`);
    }
  }

  async updateMeeting(
    id: string,
    updatedMeeting: Partial<Meeting>
  ): Promise<Meeting | null> {
    try {
      const meet = await this.model
        .findByIdAndUpdate(id, updatedMeeting, { new: true })
        .exec();
      return meet ? this.mapToMeeting(meet) : null;
    } catch (error: any) {
      throw new Error(`Error updating meeting: ${error.message}`);
    }
  }

  async deleteMeeting(id: string): Promise<Meeting | null> {
    try {
      const meet = await this.model.findByIdAndDelete(id).exec();
      return meet ? this.mapToMeeting(meet) : null;
    } catch (error: any) {
      throw new Error(`Error deleting meeting: ${error.message}`);
    }
  }

  mapToMeeting = (doc: Document): Meeting => {
    return new Meeting(
      doc.get("_id").toString(),
      doc.get("courseId").toString(),
      doc.get("mentorId").toString(),
      doc.get("learnerId").toString(),
      doc.get("roomId"),
      doc.get("slotId").toString()
    );
  };

  mapToPopulateMeeting = (doc: Document): PopulateMeeting => {
    return {
      id: doc.get("_id").toString(),
      course: {
        _id: doc.get("courseId")._id.toString(),
        title: doc.get("courseId").title,
      },
      mentor: {
        firstName: doc.get("mentorId").firstName,
        lastName: doc.get("mentorId").lastName,
      },
      learner: {
        firstName: doc.get("learnerId").firstName,
        lastName: doc.get("learnerId").lastName,
      },
      roomId: doc.get("roomId"),
      slot: {
        _id: doc.get("slotId")._id.toString(),
        dateTime: doc.get("slotId").dateTime,
      },
    };
  };
}

export default MeetingRepository;
