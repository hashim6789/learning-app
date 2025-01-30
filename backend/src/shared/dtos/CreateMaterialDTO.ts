export interface CreateMaterialDTO {
  title: string;
  description: string;
  type: "reading" | "video";
  url: string; // For video
  duration: number; // For video
}
