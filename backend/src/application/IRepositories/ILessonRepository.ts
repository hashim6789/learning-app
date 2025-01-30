import { CreateLessonDTO } from "../../shared/dtos/createLessonDTO";
import Lesson from "../entities/Lesson";

export default interface ILessonRepository {
  fetchLessonById(lessonId: string): Promise<Lesson | null>;
  fetchAllLessonsByMentorId(mentorId: string): Promise<Lesson[] | null>;
  updateLessonById(
    lessonId: string,
    data: Partial<Lesson>
  ): Promise<Lesson | null>;
  deleteLessonById(lessonId: string): Promise<Lesson | null>;
  createLesson(data: CreateLessonDTO, mentorId: string): Promise<Lesson | null>;
}
