export interface CreateMaterialDTO {
  title: string;
  description: string;
  type: "reading" | "video";
  fileKey: string; // For video
  duration: number; // For video
}
