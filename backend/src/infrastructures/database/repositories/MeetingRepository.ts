import { Model } from "mongoose";
import { IMeeting } from "../interfaces/IMeeting";
import MeetingModel from "../models/MeetingModel"; // Adjust the import path as needed
import IMeetingRepository from "../../../application/IRepositories/IMeetingRepository";

class MeetingRepository implements IMeetingRepository {
  private model: Model<IMeeting>;

  constructor() {
    this.model = MeetingModel;
  }

  async createMeeting(meeting: IMeeting): Promise<IMeeting> {
    try {
      const newMeeting = new this.model(meeting);
      return await newMeeting.save();
    } catch (error: any) {
      throw new Error(`Error creating meeting: ${error.message}`);
    }
  }

  async getMeetingById(id: string): Promise<IMeeting | null> {
    try {
      const meet = await this.model.findById(id).populate("courseId").exec();
      return meet;
    } catch (error: any) {
      throw new Error(`Error getting meeting by ID: ${error.message}`);
    }
  }

  async getAllMeetings(): Promise<IMeeting[]> {
    try {
      return await this.model.find().exec();
    } catch (error: any) {
      throw new Error(`Error getting all meetings: ${error.message}`);
    }
  }

  async updateMeeting(
    id: string,
    updatedMeeting: Partial<IMeeting>
  ): Promise<IMeeting | null> {
    try {
      return await this.model
        .findByIdAndUpdate(id, updatedMeeting, { new: true })
        .exec();
    } catch (error: any) {
      throw new Error(`Error updating meeting: ${error.message}`);
    }
  }

  async deleteMeeting(id: string): Promise<IMeeting | null> {
    try {
      return await this.model.findByIdAndDelete(id).exec();
    } catch (error: any) {
      throw new Error(`Error deleting meeting: ${error.message}`);
    }
  }
}

export default MeetingRepository;
