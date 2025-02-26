import { Learner } from "../entities/learner.entity";
import { IUserRepository } from "./IUserRepository";

export interface ILearnerRepository extends IUserRepository<Learner> {}
// // fetchByEmail(email: string): Promise<Learner | null>;
// fetchById(learnerId: string): Promise<Learner | null>;
// fetchAll(): Promise<Learner[] | null>;
// updateById(
//   learnerId: string,
//   data: Partial<Learner>
// ): Promise<Learner | null>;
// deleteById(learnerId: string): Promise<Learner | null>;
// // fetchByGoogleId(googleId: string): Promise<Learner | null>;
// // createLearner(data: Learner): Promise<Learner>;
// // BlockLearner(learnerId: string, isBlock: boolean): Promise<Learner | null>;
// // fetchByRefreshToken(token: string): Promise<Learner | null>;
// // // deleteRefreshToken(learnerId: string): Promise<Learner | null>;
// // setOtpToDB(learnerId: string, otp: string): Promise<Learner | null>;
// // verifyLearner(learnerId: string): Promise<Learner | null>;
// // updateLearner(
// //   learnerId: string,
// //   data: Partial<Learner>
// // ): Promise<Learner | null>;
