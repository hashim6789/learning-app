import { CreateLessonDTO } from "../../shared/dtos/createLessonDTO";
import { LessonQuery } from "../../shared/types/filters";
import Lesson from "../entities/lesson.entity";

export default interface ILessonRepository {
  fetchLessonById(lessonId: string): Promise<Lesson | null>;
  fetchAllLessonsByMentorId(
    mentorId: string,
    filter: LessonQuery
  ): Promise<{ lessons: Lesson[]; docCount: number } | null>;
  updateLessonById(
    lessonId: string,
    data: Partial<Lesson>
  ): Promise<Lesson | null>;
  deleteLessonById(lessonId: string): Promise<Lesson | null>;
  fetchMentorLessonByTitle(
    mentorId: string,
    title: string
  ): Promise<Lesson | null>;
  createLesson(data: CreateLessonDTO, mentorId: string): Promise<Lesson | null>;
}
