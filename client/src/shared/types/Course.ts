import { Category } from "./Category";
import { CourseStatus } from "./CourseStatus";

export interface Course {
  id: string;
  status: CourseStatus;
  title: string;
  category: Category;
  thumbnail: string;
  lessons: { id: string; title: string }[];
  description: string;
  duration: number;
  price: number;
}
