// types/materials.ts

// Define the base Material type
export interface IMaterial {
  _id: string;
  title: string;
  description: string;
  type: "reading" | "assessment" | "video";
}

// Interface for reading type
export interface IReadingMaterial extends IMaterial {
  content: string;
}

// Interface for assessment type
export interface IAssessmentMaterial extends IMaterial {
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
  totalMarks: number;
}

// Interface for video type
export interface IVideoMaterial extends IMaterial {
  url: string;
  duration: number;
}

// Type guard functions
export const isReadingMaterial = (
  material: IMaterial
): material is IReadingMaterial => {
  return material.type === "reading";
};

export const isAssessmentMaterial = (
  material: IMaterial
): material is IAssessmentMaterial => {
  return material.type === "assessment";
};

export const isVideoMaterial = (
  material: IMaterial
): material is IVideoMaterial => {
  return material.type === "video";
};
