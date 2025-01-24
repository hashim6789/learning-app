import { Mentor } from "../../../application/entities/Mentor";
import { IMentorRepository } from "../../../application/IRepositories/IMentorRepository";
import MentorModel, { IMentor } from "../models/MentorModel";

class MentorRepository implements IMentorRepository {
  //find mentor by email
  async findByEmail(email: string): Promise<Mentor | null> {
    const mentor = await MentorModel.findOne({ email });
    if (!mentor) return null;
    return mappingMentor(mentor);
  }

  //for google signup and login
  async findByGoogleId(googleId: string): Promise<Mentor | null> {
    const mentor = await MentorModel.findOne({ googleId });
    if (!mentor) return null;
    return mappingMentor(mentor);
  }

  //to create a new mentor
  async createMentor(data: Mentor): Promise<Mentor> {
    const newMentor = new MentorModel(data);
    await newMentor.save();
    return mappingMentor(newMentor);
  }

  //to fetch all mentors
  async fetchAllMentors(): Promise<Mentor[] | null> {
    const mentors = await MentorModel.find();
    if (!mentors || mentors.length === 0) return null;
    return mentors.map(mappingMentor);
  }

  async fetchMentorById(mentorId: string): Promise<Mentor | null> {
    const mentor = await MentorModel.findById(mentorId).populate({
      path: "createdCourses", // Path to the field being populated
      model: "Courses", // The model being populated
    });

    console.log("populated mentor", mentor);

    if (!mentor) return null;
    return mappingMentor(mentor);
  }

  async BlockMentor(
    mentorId: string,
    isBlock: boolean
  ): Promise<Mentor | null> {
    const updatedMentor = await MentorModel.findByIdAndUpdate(
      mentorId,
      { isBlocked: isBlock },
      { new: true }
    );
    if (!updatedMentor) return null;
    return mappingMentor(updatedMentor);
  }

  async setOtpToDB(mentorId: string, otp: string): Promise<Mentor | null> {
    try {
      const mentor = await MentorModel.findByIdAndUpdate(
        mentorId,
        { otp, otpExpiration: Date.now() + 5 * 1000 * 60 },
        { new: true }
      );
      if (!mentor) return null;
      return mappingMentor(mentor);
    } catch (error) {
      throw new Error("An error when set the refresh token in to db");
    }
  }

  async findByRefreshToken(token: string): Promise<Mentor | null> {
    try {
      const mentor = await MentorModel.findOne({ refreshToken: token });
      if (!mentor) return null;
      return mappingMentor(mentor);
    } catch (error) {
      throw new Error("An error when find the mentor by refreshToken");
    }
  }

  async deleteRefreshToken(mentorId: string): Promise<Mentor | null> {
    try {
      const unRefreshedMentor = await MentorModel.findByIdAndUpdate(
        mentorId,
        { refreshToken: null },
        { new: true }
      );
      if (!unRefreshedMentor) return null;
      return mappingMentor(unRefreshedMentor);
    } catch (error) {
      throw new Error("An error when delete the mentor's refresh token!");
    }
  }

  async setRefreshToken(
    mentorId: string,
    token: string
  ): Promise<Mentor | null> {
    try {
      const refreshedMentor = await MentorModel.findByIdAndUpdate(
        mentorId,
        { refreshToken: token },
        { new: true }
      );
      if (!refreshedMentor) return null;
      return mappingMentor(refreshedMentor);
    } catch (error) {
      throw new Error("An error when");
    }
  }

  async verifyMentor(mentorId: string): Promise<Mentor | null> {
    try {
      const verifiedMentor = await MentorModel.findByIdAndUpdate(
        mentorId,
        { isVerified: true },
        { new: true }
      );
      if (!verifiedMentor) return null;
      return mappingMentor(verifiedMentor);
    } catch (error) {
      throw new Error("An error when the mentor verifying!");
    }
  }

  async updateMentor(
    mentorId: string,
    data: Partial<Mentor>
  ): Promise<Mentor | null> {
    try {
      const mentor = await MentorModel.findByIdAndUpdate(mentorId, data, {
        new: true,
      });
      if (!mentor) return null;
      return mappingMentor(mentor);
    } catch (error) {
      throw new Error("An error when update the mentor");
    }
  }

  async deleteMentorById(mentorId: string): Promise<Mentor | null> {
    try {
      const deletedMentor = await MentorModel.findByIdAndDelete(mentorId);
      if (!deletedMentor) return null;
      return mappingMentor(deletedMentor);
    } catch (error) {
      throw new Error("An error when deleting the mentor");
    }
  }
}

//to convert IMentor to Mentor
function mappingMentor(data: IMentor): Mentor {
  const id = data._id.toString();
  const createdCourses = data.createdCourses
    ? data.createdCourses.map((courseId) => courseId.toString())
    : null;
  return new Mentor(
    data.googleId || null,
    id,
    data.firstName,
    data.lastName || null,
    data.email,
    data.password,
    data.profilePicture,
    [],
    createdCourses,
    data.isBlocked || false,
    data.isVerified || false,
    data.refreshToken || null,
    data.resetToken || null
  );
}

export default MentorRepository;
