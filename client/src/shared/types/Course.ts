import { Category } from "./Category";
import { CourseStatus } from "./CourseStatus";
import { Lesson } from "./Lesson";

export interface Course {
  id: string;
  status: CourseStatus;
  title: string;
  category: Category;
  thumbnail: string;
  lessons: Lesson[];
  description: string;
}
