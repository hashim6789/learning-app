import { z } from "zod";
import { UserSchema } from "./user.schema";

export const SignupLearnerSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long." }),

  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long." })
    .optional(),

  email: z.string().email({ message: "Email must be a valid email address." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),

  profilePicture: z
    .string({ message: "Profile picture must be a valid URL or path." })
    .optional(),

  role: UserSchema,
});

// export type SignupLearnerDTO = z.infer<typeof SignupLearnerSchema>;
