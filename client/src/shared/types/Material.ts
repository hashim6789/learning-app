export type MaterialType = "reading" | "video";

// Define the base Material type
export interface IMaterial {
  id: string;
  title: string;
  description: string;
  type: MaterialType;
  duration: number;
  fileKey: string;
}
