import { z } from "zod";
import { UserSchema } from "./user.schema";

export const ResetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
  role: UserSchema,
});

// export type ResetPasswordDTO = z.infer<typeof ResetPasswordSchema>;
// export type UserType = z.infer<typeof UserTypeSchema>;
