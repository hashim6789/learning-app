import mongoose from "mongoose";
import { Mentor } from "../../../application/entities/Mentor";
import { IMentorRepository } from "../../../application/IRepositories/IMentorRepository";
import MentorModel from "../models/MentorModel";
import { IUserRepository } from "../../../application/IRepositories/IUserRepository";
import { User } from "../../../application/entities/User";
import { IMentor } from "../interfaces/IMentor";

class MentorRepository implements IUserRepository<Mentor> {
  //to fetch all mentors
  async fetchAll(): Promise<Mentor[] | null> {
    try {
      const mentors = await MentorModel.find();
      if (!mentors) return null;
      return mentors.map(mappingMentor);
    } catch (error) {
      if (error instanceof Error && error.name === "DocumentNotFoundError") {
        return [];
      }
      throw new Error("Failed to fetch the learners!");
    }
  }

  async fetchById(mentorId: string): Promise<Mentor | null> {
    const mentor = await MentorModel.findById(mentorId);
    // .populate({
    //   path: "createdCourses", // Path to the field being populated
    //   model: "Courses", // The model being populated
    // });

    console.log("populated mentor", mentor);

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

  // async fetchByData(data: Partial<User>): Promise<User | null> {
  //   try {
  //     const mentor = await MentorModel.find({ data });

  //     console.log("populated mentor", mentor);

  //     if (!mentor) return null;
  //     return mappingMentor(mentor);
  //   } catch (error) {
  //     throw new Error("");
  //   }
  // }

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

  // //for google signup and login
  // async fetchByGoogleId(googleId: string): Promise<Mentor | null> {
  //   const mentor = await MentorModel.findOne({ googleId });
  //   if (!mentor) return null;
  //   return mappingMentor(mentor);
  // }

  // async BlockMentor(
  //   mentorId: string,
  //   isBlock: boolean
  // ): Promise<Mentor | null> {
  //   const updatedMentor = await MentorModel.findByIdAndUpdate(
  //     mentorId,
  //     { isBlocked: isBlock },
  //     { new: true }
  //   );
  //   if (!updatedMentor) return null;
  //   return mappingMentor(updatedMentor);
  // }

  // async setOtpToDB(mentorId: string, otp: string): Promise<Mentor | null> {
  //   try {
  //     const mentor = await MentorModel.findByIdAndUpdate(
  //       mentorId,
  //       { otp, otpExpiration: Date.now() + 5 * 1000 * 60 },
  //       { new: true }
  //     );
  //     if (!mentor) return null;
  //     return mappingMentor(mentor);
  //   } catch (error) {
  //     throw new Error("An error when set the refresh token in to db");
  //   }
  // }

  // async fetchByRefreshToken(token: string): Promise<Mentor | null> {
  //   try {
  //     const mentor = await MentorModel.findOne({ refreshToken: token });
  //     if (!mentor) return null;
  //     return mappingMentor(mentor);
  //   } catch (error) {
  //     throw new Error("An error when find the mentor by refreshToken");
  //   }
  // }

  // async deleteRefreshToken(mentorId: string): Promise<Mentor | null> {
  //   try {
  //     const unRefreshedMentor = await MentorModel.findByIdAndUpdate(
  //       mentorId,
  //       { refreshToken: null },
  //       { new: true }
  //     );
  //     if (!unRefreshedMentor) return null;
  //     return mappingMentor(unRefreshedMentor);
  //   } catch (error) {
  //     throw new Error("An error when delete the mentor's refresh token!");
  //   }
  // }

  // async verifyMentor(mentorId: string): Promise<Mentor | null> {
  //   try {
  //     const verifiedMentor = await MentorModel.findByIdAndUpdate(
  //       mentorId,
  //       { isVerified: true },
  //       { new: true }
  //     );
  //     if (!verifiedMentor) return null;
  //     return mappingMentor(verifiedMentor);
  //   } catch (error) {
  //     throw new Error("An error when the mentor verifying!");
  //   }
  // }

  // async updateMentor(
  //   mentorId: string,
  //   data: Partial<Mentor>
  // ): Promise<Mentor | null> {
  //   try {
  //     const mentor = await MentorModel.findByIdAndUpdate(mentorId, data, {
  //       new: true,
  //     });
  //     if (!mentor) return null;
  //     return mappingMentor(mentor);
  //   } catch (error) {
  //     throw new Error("An error when update the mentor");
  //   }
  // }

  // //get analytics for mentor courses
  // async fetMentorCoursesAnalytics(mentorId: string): Promise<any[]> {
  //   try {
  //     const mentorObjectId = new mongoose.Types.ObjectId(mentorId);
  //     const data = await MentorModel.aggregate([
  //       { $match: { _id: mentorObjectId } },
  //       {
  //         $lookup: {
  //           from: "courses",
  //           localField: "createdCourses",
  //           foreignField: "_id",
  //           as: "courses",
  //         },
  //       },
  //       {
  //         $unwind: "$courses",
  //       },
  //       {
  //         $group: {
  //           _id: "$courses.status",
  //           count: { $sum: 1 },
  //         },
  //       },
  //       {
  //         $project: {
  //           _id: 0,
  //           status: "$_id",
  //           count: 1,
  //         },
  //       },
  //     ]);

  //     console.log("aggregated data :", data);
  //     return data;
  //   } catch (error) {
  //     throw new Error("Failed to aggregate courses of the mentor");
  //   }
  // }

  // async setCreatedCourseId(
  //   mentorId: string,
  //   courseId: string
  // ): Promise<Mentor | null> {
  //   try {
  //     const updatedMentor = await MentorModel.findByIdAndUpdate(
  //       mentorId,
  //       { $addToSet: { createdCourses: courseId } },
  //       { new: true }
  //     );
  //     if (!updatedMentor) return null;
  //     return mappingMentor(updatedMentor);
  //   } catch (error) {
  //     throw new Error("Failed to set courseId to the mentor");
  //   }
  // }

  // async fetchMentor(data: Mentor): Promise<Mentor | null> {
  //   try {
  //     const mentorId = "";
  //     const mentor = await MentorModel.findByIdAndUpdate(mentorId, data, {
  //       new: true,
  //     });
  //     if (!mentor) return null;
  //     return mappingMentor(mentor);
  //   } catch (error) {
  //     throw new Error("An error when update the mentor");
  //   }
  // }
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
    data.firstName,
    data.lastName || "",
    data.profilePicture,
    data.googleId || null,
    [],
    createdCourses
  );
}

export default MentorRepository;
