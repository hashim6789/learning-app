import mongoose from "mongoose";
import { Mentor } from "../../../application/entities/mentor.entity";
import { IMentorRepository } from "./interface/IMentorRepository";
import MentorModel from "../models/MentorModel";
import { IUserRepository } from "./interface/IUserRepository";
import { User } from "../../../application/entities/user.entity";
import { IMentor } from "../interfaces/IMentor";
import { UserQuery } from "../../../shared/types/query";

class MentorRepository implements IMentorRepository {
  // to fetch all mentors
  async fetchAll({
    status = "all",
    search = "",
    page = "1",
    limit = "10",
  }: UserQuery): Promise<{ users: Mentor[]; docCount: number } | null> {
    try {
      const query = {
        isBlocked:
          status !== "all"
            ? status === "blocked"
              ? true
              : false
            : { $exists: true },
        $or: [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
        ],
      };
      const learners = await MentorModel.find(query)
        .skip((parseInt(page, 10) - 1) * parseInt(limit, 10))
        .limit(parseInt(limit, 10))
        .sort({ createdAt: -1 });

      if (!learners) return null;

      const totalCount = await MentorModel.countDocuments(query);

      const mappedLearners = learners.map((learner) => mappingMentor(learner));

      return { users: mappedLearners, docCount: totalCount };
    } catch (error) {
      if (error instanceof Error && error.name === "DocumentNotFoundError") {
        return null;
      }
      throw new Error("Failed to fetch the learners!");
    }
  }

  async fetchById(mentorId: string): Promise<Mentor | null> {
    const mentor = await MentorModel.findById(mentorId);

    if (!mentor) return null;
    return mappingMentor(mentor);
  }

  async updateById(
    mentorId: string,
    data: Partial<Mentor>
  ): Promise<Mentor | null> {
    try {
      const refreshedMentor = await MentorModel.findByIdAndUpdate(
        mentorId,
        data,
        { new: true }
      );
      if (!refreshedMentor) return null;
      return mappingMentor(refreshedMentor);
    } catch (error) {
      throw new Error("An error when update the mentor");
    }
  }

  async deleteById(mentorId: string): Promise<Mentor | null> {
    try {
      const deletedMentor = await MentorModel.findByIdAndDelete(mentorId);
      if (!deletedMentor) return null;
      return mappingMentor(deletedMentor);
    } catch (error) {
      throw new Error("An error when deleting the mentor");
    }
  }

  async fetchByField(field: { [key: string]: any }): Promise<Mentor | null> {
    try {
      const mentor = await MentorModel.findOne(field);
      if (!mentor) return null;
      return mappingMentor(mentor);
    } catch (error) {
      throw new Error("An error when find the mentor by refreshToken");
    }
  }

  // to create a new mentor
  async create(data: Mentor): Promise<Mentor> {
    const newMentor = new MentorModel(data);
    await newMentor.save();
    return mappingMentor(newMentor);
  }
  //find mentor by email
  async fetchByEmail(email: string): Promise<Mentor | null> {
    const mentor = await MentorModel.findOne({ email });
    if (!mentor) return null;
    return mappingMentor(mentor);
  }
}

//to convert IMentor to Mentor
function mappingMentor(data: IMentor): Mentor {
  const id = data._id.toString();
  const createdCourses = data.createdCourses
    ? data.createdCourses.map((courseId) => courseId.toString())
    : null;
  return new Mentor(
    id,
    data.email,
    data.password,
    data.isBlocked || false,
    data.isVerified || false,
    data.refreshToken || null,
    data.resetToken || null,
    data.profilePicture,
    data.firstName,
    data.lastName || "",
    data.googleId || null,
    [],
    createdCourses
  );
}

export default MentorRepository;
