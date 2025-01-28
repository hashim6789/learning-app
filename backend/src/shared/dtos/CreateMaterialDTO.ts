export interface CreateMaterialDTO {
  title: string;
  description: string;
  type: "reading" | "assessment" | "video";
  content?: string; // For reading
  wordCount?: number; // For reading
  questions?: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[]; // For assessment
  totalMarks?: number; // For assessment
  url?: string; // For video
  duration?: number; // For video
}
