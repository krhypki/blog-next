import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "../constants";

export const imageSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.size <= MAX_FILE_SIZE, "Max image size is 300kb")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
      "Invalid image type"
    ),
});
