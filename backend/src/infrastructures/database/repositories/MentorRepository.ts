import { Mentor } from "../../../application/entities/Mentor";
import { IMentorRepository } from "../../../application/IRepositories/IMentorRepository";
import LearnerModel from "../models/LearnerModel";
import MentorModel, { IMentor } from "../models/MentorModel";

class MentorRepository implements IMentorRepository {
  //fetch the mentor using email
  async findByEmail(email: string): Promise<Mentor | null> {
    const mentor = await MentorModel.findOne({ email });
    if (!mentor) return null;
    return mappedMentor(mentor);
  }

  //fetch the mentor by google id
  async findByGoogleId(googleId: string): Promise<Mentor | null> {
    const mentor = await MentorModel.findOne({ googleId });
    if (!mentor) return null;
    return mappedMentor(mentor);
  }

  //fetch all mentors
  async fetchAllMentors(): Promise<Mentor[] | null> {
    const mentors = await MentorModel.find();
    if (!mentors || mentors.length === 0) return null;
    return mentors.map(mappedMentor);
  }

  //fetch a mentor by id
  async fetchMentorById(mentorId: string): Promise<Mentor | null> {
    const mentor = await MentorModel.findById(mentorId).populate(
      "createdCourses"
    );
    console.log("mentor =", mentor);
    if (!mentor) return null;
    return mappedMentor(mentor);
  }

  //block and unblock the mentor
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
    return mappedMentor(updatedMentor);
  }

  //create a mentor
  async createMentor(data: Mentor): Promise<Mentor> {
    const newMentor = new MentorModel(data);
    await newMentor.save();

    return mappedMentor(newMentor);
  }

  //for setting the refresh token
  async setRefreshToken(
    mentorId: string,
    token: string
  ): Promise<Mentor | null> {
    try {
      const mentor = await MentorModel.findById(
        mentorId,
        { refreshToken: token },
        { new: true }
      );
      if (!mentor) return null;
      return mappedMentor(mentor);
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

//to convert the IMentor to Mentor
function mappedMentor(data: IMentor): Mentor {
  const id = data._id?.toString() || ""; // Ensure id is a string
  const createdCourses = data.createdCourses
    ? data.createdCourses.map((courseId) => courseId?.toString() || "")
    : [];

  const refreshToken = data.refreshToken || null;

  return new Mentor(
    id,
    data.googleId || null,
    data.firstName,
    data.lastName || null,
    data.email,
    data.profilePicture || null,
    createdCourses.length > 0 ? createdCourses : null, // Return null if no courses
    data.bankDetails || [], // Default to an empty array
    data.isBlocked,
    data.password || null,
    refreshToken || null
  );
}

export default MentorRepository;
