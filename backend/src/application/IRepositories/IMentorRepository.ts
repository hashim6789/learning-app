import { Mentor } from "../entities/Mentor";
import { IUserRepository } from "./IUserRepository";

export interface IMentorRepository extends IUserRepository<Mentor> {}
// fetchAll(): Promise<Mentor[] | null>;
// fetchById(mentorId: string): Promise<Mentor | null>;
// updateById(mentorId: string, data: Partial<Mentor>): Promise<Mentor | null>;
// deleteById(mentorId: string): Promise<Mentor | null>;
// // fetchByEmail(email: string): Promise<Mentor | null>;
// // fetchByGoogleId(googleId: string): Promise<Mentor | null>;
// // fetchMentor(data: Mentor): Promise<Mentor | null>;
// // fetchByRefreshToken(token: string): Promise<Mentor | null>;
// // BlockMentor(mentorId: string, isBlock: boolean): Promise<Mentor | null>;
// // deleteRefreshToken(mentorId: string): Promise<Mentor | null>;
// // setOtpToDB(mentorId: string, otp: string): Promise<Mentor | null>;
// // verifyMentor(mentorId: string): Promise<Mentor | null>;
// // updateMentor(mentorId: string, data: Partial<Mentor>): Promise<Mentor | null>;
// // setCreatedCourseId(
// //   mentorId: string,
// //   courseId: string
// // ): Promise<Mentor | null>;
// // fetMentorCoursesAnalytics(mentorId: string): Promise<any>;
