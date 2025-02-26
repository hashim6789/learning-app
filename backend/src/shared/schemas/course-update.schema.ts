import { z } from "zod";
import { CreateCourseSchema } from "./course-create.schema";

export const UpdateCourseSchema = CreateCourseSchema.pick({
  title: true,
  mentorId: true,
  category: true,
  description: true,
});

export type UpdateCourseDTO = z.infer<typeof UpdateCourseSchema>;
