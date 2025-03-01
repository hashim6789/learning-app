import { z } from "zod";

export const lessonSchema = z.object({
  title: z.string().min(1, { message: "The title field is required." }),
  materials: z.array(z.string()), // Array of material IDs (strings)
  duration: z.number(),
  description: z.string().optional(),
});

export type LessonType = z.infer<typeof lessonSchema>;
