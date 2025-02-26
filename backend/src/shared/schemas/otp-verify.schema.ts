import { z } from "zod";

export const OtpSchema = z.object({
  otp: z.string().min(6, { message: "OTP must be at least 6 digits long." }),
});

// export type OtpDTO = z.infer<typeof OtpSchema>;
