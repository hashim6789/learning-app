import { z } from "zod";
import { MaterialTypeSchema } from "./material.schema";

export const CreateMaterialSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  type: MaterialTypeSchema,
  fileKey: z.string().min(1, { message: "File key is required for video." }),
  duration: z.number().min(1, { message: "Duration is required for video." }),
});

// export type CreateMaterialDTO = z.infer<typeof CreateMaterialSchema>;
