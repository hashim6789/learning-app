import { z } from "zod";

export const MaterialTypeSchema = z.enum(["reading", "video"]);

// export type Material = z.infer<typeof MaterialSchema>;
