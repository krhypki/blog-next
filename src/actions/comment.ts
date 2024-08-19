"use server";

import { getErrorMessage } from "@/lib/utils/error";
import { validateFormData } from "@/lib/utils/validateFormData";
import { commentSchema } from "@/lib/zod/comment";
import { revalidatePath } from "next/cache";
import { insertComment } from "./db/comment";
import { Post } from "@/lib/types/database";

export async function addNewComment(postId: Post["id"], formData: unknown) {
  const validatedData = validateFormData(formData, commentSchema);

  if ("error" in validatedData) {
    return {
      error: "Invalid data",
    };
  }

  try {
    const response = await insertComment(postId, validatedData.content);
    revalidatePath("/");
    return response;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return { error: errorMessage };
  }
}
