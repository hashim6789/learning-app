import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showToast } from "../../../shared/utils/toastUtils";

export const courseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  thumbnail: z.string().url("The thumbnail must be a valid URL"),
  category: z
    .object({
      id: z.string().min(1, "Category ID is required"),
      title: z.string().min(1, "Category title is required"),
    })
    .nullable() // Allows category to be null initially
    .refine((data) => data !== null, {
      message: "Please select a valid category",
    }),

  lessons: z
    .array(
      z.object({
        id: z.string().nonempty("Lesson ID is required"),
        title: z.string().nonempty("Lesson title is required"),
      })
    )
    .refine(
      (materials) => {
        const ids = materials.map((material) => material.id);
        const uniqueIds = new Set(ids);
        console.log("Checking Lesson: ", ids, uniqueIds);

        if (uniqueIds.size !== ids.length) {
          showToast.error("Duplicate or empty lesson IDs are not allowed");
          return false;
        }
        return true;
      },
      { message: "Duplicate or empty lesson IDs are not allowed" }
    ),
  // duration: z
  //   .number({ invalid_type_error: "Duration must be a number" })
  //   .min(15, "Duration must be at least 15 minute"),
});
