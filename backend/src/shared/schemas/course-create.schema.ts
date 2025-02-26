import { z } from "zod";

export const CreateCourseSchema = z.object({
  title: z.string().min(1, { message: "The title field is required." }),
  mentorId: z.string().min(1, { message: "The mentorId field is required." }),
  category: z.string().min(1, { message: "The category field is required." }),
  thumbnail: z.string().optional(),
  description: z.string().optional(),
  lessons: z.array(z.string(), { message: "Each lesson must be a string." }),
  price: z.number(),

  // Optional fields
  duration: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  rejectionReason: z.string().optional(),
  purchaseCount: z.number().optional(),
});

// export type CreateCourseDTO = z.infer<typeof CreateCourseSchema>;
