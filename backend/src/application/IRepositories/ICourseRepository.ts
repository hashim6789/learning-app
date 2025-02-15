import { CreateCourseDTO } from "../../shared/dtos/createCourseDTO";
import { CourseStatus } from "../../shared/types";
import { CourseLearnerQuery, CourseQuery } from "../../shared/types/filters";
import Course from "../entities/Course";

export default interface ICourseRepository {
  findCourseById(courseId: string): Promise<Course | null>;
  findCourseByTitle(title: string): Promise<Course | null>;
  fetchAllCourses(): Promise<{ courses: Course[]; docCount: number } | null>;
  fetchAllCoursesByMentorId(
    mentorId: string,
    filter: CourseQuery
  ): Promise<{ courses: Course[]; docCount: number } | null>;
  updateCourseById(
    courseId: string,
    data: Partial<Course>
  ): Promise<Course | null>;
  deleteCourseById(courseId: string): Promise<Course | null>;
  createCourse(data: CreateCourseDTO): Promise<Course | null>;
  addLessonsToCourse(
    courseId: string,
    lessonId: string
  ): Promise<Course | null>;
  fetchAllCoursesByFilter(
    status: CourseStatus,
    filter: CourseLearnerQuery
  ): Promise<{ courses: Course[]; docCount: number } | null>;
}
