import { CreateCourseDTO } from "../../shared/dtos/createCourseDTO";
import { CourseQuery } from "../../shared/types/filters";
import Course from "../entities/Course";

export default interface ICourseRepository {
  findCourseById(courseId: string): Promise<Course | null>;
  findCourseByTitle(title: string): Promise<Course | null>;
  fetchAllCourses(): Promise<Course[] | null>;
  fetchAllCoursesByMentorId(
    mentorId: string,
    filter: CourseQuery
  ): Promise<Course[] | null>;
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
  fetchAllCoursesByFilter(filter: object): Promise<Course[] | null>;
}
