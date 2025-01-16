import { Mentor } from "../entities/Mentor";
export interface IMentorRepository {
  findByEmail(email: string): Promise<Mentor | null>;
  findByGoogleId(googleId: string): Promise<Mentor | null>;
  createMentor(data: Mentor): Promise<Mentor>;
  setRefreshToken(mentorId: string, token: string): Promise<Mentor | null>;
  fetchAllMentors(): Promise<Mentor[] | null>;
  fetchMentorById(mentorId: string): Promise<Mentor | null>;
  BlockMentor(mentorId: string, isBlock: boolean): Promise<Mentor | null>;
}
