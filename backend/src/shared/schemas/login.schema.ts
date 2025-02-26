import { z } from "zod";
import { UserSchema } from "./user.schema";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email must be a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
  role: UserSchema,
});

// export type LoginDTO = z.infer<typeof LoginSchema>;
// export type User = z.infer<typeof UserSchema>;
