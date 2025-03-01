import { CreateLessonDTO } from "../../../../shared/dtos/createLessonDTO";
import { LessonType } from "../../../../shared/schemas/lesson.schema";
import { LessonQuery } from "../../../../shared/types/filters";
import Lesson from "../../../../application/entities/lesson.entity";

export default interface ILessonRepository {
  fetchLessonById(lessonId: string): Promise<Lesson | null>;
  fetchAllLessonsByMentorId(
    mentorId: string,
    filter: LessonQuery
  ): Promise<{ lessons: Lesson[]; docCount: number } | null>;
  updateLessonById(
    lessonId: string,
    data: Omit<LessonType, "duration">
  ): Promise<Lesson | null>;
  deleteLessonById(lessonId: string): Promise<Lesson | null>;
  fetchMentorLessonByTitle(
    mentorId: string,
    title: string
  ): Promise<Lesson | null>;
  createLesson(
    data: Omit<LessonType, "duration">,
    mentorId: string
  ): Promise<Lesson | null>;
}
