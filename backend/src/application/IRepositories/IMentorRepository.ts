import { Mentor } from "../entities/Mentor";

export interface IMentorRepository {
  findByEmail(email: string): Promise<Mentor | null>;
  findByGoogleId(googleId: string): Promise<Mentor | null>;
  createMentor(data: Mentor): Promise<Mentor>;
  fetchAllMentors(): Promise<Mentor[] | null>;
  fetchMentorById(mentorId: string): Promise<Mentor | null>;
  BlockMentor(mentorId: string, isBlock: boolean): Promise<Mentor | null>;
  setRefreshToken(mentorId: string, token: string): Promise<Mentor | null>;
  findByRefreshToken(token: string): Promise<Mentor | null>;
  deleteRefreshToken(mentorId: string): Promise<Mentor | null>;
  setOtpToDB(mentorId: string, otp: string): Promise<Mentor | null>;
  verifyMentor(mentorId: string): Promise<Mentor | null>;
  updateMentor(mentorId: string, data: Partial<Mentor>): Promise<Mentor | null>;
  deleteMentorById(mentorId: string): Promise<Mentor | null>;
  setCreatedCourseId(
    mentorId: string,
    courseId: string
  ): Promise<Mentor | null>;
  fetMentorCoursesAnalytics(mentorId: string): Promise<any>;
}
