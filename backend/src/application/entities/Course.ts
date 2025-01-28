import Lesson from "./Lesson";
import { Category } from "./Category";

export default class Course {
  id: string | null;
  title: string;
  mentorId: string;
  category: string | Category;
  description: string | null;
  thumbnail: string | null;
  lessons: Lesson[] | null;
  duration: number | null;
  status: string | null;
  rejectionReason: string | null;
  purchaseCount: number | null;

  constructor(
    id: string | null,
    title: string,
    mentorId: string,
    category: string | Category,
    description: string | null,
    thumbnail: string | null,
    lessons: Lesson[] | null,
    duration: number | null,
    status: string | null,
    rejectionReason: string | null,
    purchaseCount: number | null
  ) {
    this.id = id;
    this.title = title;
    this.mentorId = mentorId;
    this.category = category;
    this.description = description;
    this.thumbnail = thumbnail;
    this.lessons = lessons;
    this.duration = duration;
    this.status = status;
    this.rejectionReason = rejectionReason;
    this.purchaseCount = purchaseCount;
  }
}

// interface Course {
//   id: string;
//   title: string;
//   mentorId: string;
//   category: string | null;
//   description: string | null;
//   thumbnail: string | null;
//   lessons: Lesson[];
//   duration: string | null;
//   status: string | null;
//   rejectionReason: string | null;
//   purchaseCount: number;
// }
