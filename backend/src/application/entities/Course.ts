import Lesson from "./Lesson";
export default class Course {
  constructor(
    id: string | null,
    title: string,
    mentorId: string,
    category: string,
    description: string | null,
    thumbnail: string | null,
    lessons: Lesson[] | null,
    duration: string | null,
    status: string | null,
    rejectionReason: string | null,
    purchaseCount: number | null
  ) {}
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
