import { z } from "zod";
export const UserSchema = z.enum(["admin", "mentor", "learner"]);
