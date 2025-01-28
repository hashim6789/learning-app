import { Course } from "../types/Course";

// Sample course data (you would replace this with actual data)
export const sampleCourse: Course = {
  id: "course-001",
  status: "approved",
  title: "Master React with TypeScript",
  category: {
    id: "cat-001",
    title: "Web Development",
    status: "unblocked",
    isListed: true,
  },
  thumbnail: "/api/placeholder/800/400",
  lessons: [
    {
      id: "lesson-1",
      title: "Introduction to React",
      duration: 45,
      isCompleted: true,
    },
    {
      id: "lesson-2",
      title: "Components and Props",
      duration: 60,
      isCompleted: false,
    },
    {
      id: "lesson-3",
      title: "State and Hooks",
      duration: 75,
      isCompleted: false,
    },
    {
      id: "lesson-4",
      title: "Advanced TypeScript",
      duration: 90,
      isCompleted: false,
    },
  ],
  description:
    "A comprehensive course to learn React with TypeScript, covering fundamentals to advanced concepts. Build real-world applications and understand best practices.",
};
