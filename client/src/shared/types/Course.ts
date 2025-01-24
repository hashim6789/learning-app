import { Lesson } from "./Lesson";

export interface Course {
  id: string;
  status: "Approved" | "Rejected" | "Pending" | "Draft";
  title: string;
  category: string;
  thumbnail: string;
  lessons: Lesson[];
  description: string;
}
