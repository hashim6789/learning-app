import { Learner } from "../entities/Learner";

export interface ILearnerRepository {
  findByEmail(email: string): Promise<Learner | null>;
  findByGoogleId(googleId: string): Promise<Learner | null>;
  createLearner(data: Learner): Promise<Learner>;
  fetchAllLearners(): Promise<Learner[] | null>;
  fetchLearnerById(learnerId: string): Promise<Learner | null>;
  BlockLearner(learnerId: string, isBlock: boolean): Promise<Learner | null>;
}
