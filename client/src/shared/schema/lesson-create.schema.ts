import { z } from "zod";
import { showToast } from "../utils/toastUtils";

export const lessonSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  materials: z
    .array(
      z.object({
        id: z.string().nonempty("Material ID is required"),
        title: z.string().nonempty("Material title is required"),
      })
    )
    .refine(
      (materials) => {
        const ids = materials.map((material) => material.id);
        const uniqueIds = new Set(ids);
        console.log("Checking materials: ", ids, uniqueIds);

        if (uniqueIds.size !== ids.length) {
          showToast.error("Duplicate or empty material IDs are not allowed");
          return false;
        }
        return true;
      },
      { message: "Duplicate or empty material IDs are not allowed" }
    ),
  // duration: z
  //   .number({ invalid_type_error: "Duration must be a number" })
  //   .min(15, "Duration must be at least 15 minute"),
});
