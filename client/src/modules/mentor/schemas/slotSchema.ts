import { z } from "zod";

export const slotSchema = z.object({
  date: z.string().nonempty("Date is required"),
  time: z.string().nonempty("Time is required"),
  duration: z
    .number()
    .min(15, "Minimum duration is 15 minutes")
    .max(120, "Maximum duration is 120 minutes"),
});

export type SlotFormData = z.infer<typeof slotSchema>;
