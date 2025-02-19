import { IProgress } from "../../infrastructures/database/interfaces/IProgress";
import { Progress } from "../entities/Progress";

export interface IProgressRepository {
  createProgress(progress: Progress): Promise<Progress | null>;
  getProgressByUserAndCourse(
    userId: string,
    courseId: string
  ): Promise<Progress | null>;
  fetchProgressById(progressId: string): Promise<Progress | null>;
  updateProgress(
    userId: string,
    courseId: string,
    updateData: Partial<Progress>
  ): Promise<Progress | null>;

  fetchAllByUserId(userId: string): Promise<IProgress[] | null>;
  fetchCourseProgressDetails(
    userId: string,
    courseId: string
  ): Promise<any | null>;

  updateProgressById(
    progressId: string,
    materialId: string
  ): Promise<Progress | null>;
}
