import { Learner } from "../entities/Learner";

export interface ILearnerRepository {
  findByEmail(email: string): Promise<Learner | null>;
  findByGoogleId(googleId: string): Promise<Learner | null>;
  createLearner(data: Learner): Promise<Learner>;
  fetchAllLearners(): Promise<Learner[] | null>;
  fetchLearnerById(learnerId: string): Promise<Learner | null>;
  BlockLearner(learnerId: string, isBlock: boolean): Promise<Learner | null>;
  setRefreshToken(learnerId: string, token: string): Promise<Learner | null>;
  findByRefreshToken(token: string): Promise<Learner | null>;
  deleteRefreshToken(learnerId: string): Promise<Learner | null>;
  setOtpToDB(learnerId: string, otp: string): Promise<Learner | null>;
  verifyLearner(learnerId: string): Promise<Learner | null>;
  updateLearner(
    learnerId: string,
    data: Partial<Learner>
  ): Promise<Learner | null>;
  deleteLearnerById(learnerId: string): Promise<Learner | null>;
}
