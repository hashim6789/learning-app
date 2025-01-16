import { CreateCourseDTO } from "../../shared/dtos/createCourseDTO";
import Course from "../entities/Course";

export default interface ICourseRepository {
  findCourseById(courseId: string): Promise<Course | null>;
  fetchAllCourses(): Promise<Course[] | null>;
  fetchAllCoursesByMentorId(mentorId: string): Promise<Course[] | null>;
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
}
