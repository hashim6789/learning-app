import Lesson from "./lesson.entity";
import { Category } from "./category.entity";

export default class Course {
  id: string | null;
  title: string;
  mentorId: string;
  category: string;
  description: string | null;
  thumbnail: string | null;
  lessons: { id: string; title: string }[] | null;
  price: number;
  status: string | null;

  constructor(
    id: string | null,
    title: string,
    mentorId: string,
    category: string,
    description: string | null,
    thumbnail: string | null,
    lessons: { id: string; title: string }[] | null,
    price: number,
    status: string | null
  ) {
    this.id = id;
    this.title = title;
    this.mentorId = mentorId;
    this.category = category;
    this.description = description;
    this.thumbnail = thumbnail;
    this.lessons = lessons;
    this.status = status;
  }
}
