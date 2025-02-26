import { z } from "zod";
import { UserSchema } from "./user.schema";

export const GoogleSignupSchema = z.object({
  token: z.string({ message: "Token must be a valid string." }),
  role: UserSchema,
});

// export type GoogleSignupDTO = z.infer<typeof GoogleSignupSchema>;
// export type User = z.infer<typeof UserSchema>;
