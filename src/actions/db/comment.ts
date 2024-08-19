"use server";

import { Post } from "@/lib/types/database";
import { findUserByEmail, getAuthUser } from "./user";
import { createClient } from "@/lib/utils/supabase/server";

export async function insertComment(postId: Post["id"], content: string) {
  const supabase = createClient();
  let userData;

  try {
    const user = await getAuthUser();

    if (user?.email) {
      const { data } = await findUserByEmail(user.email);
      userData = data;
    }
  } catch {
    throw new Error("User not found");
  }

  if (!userData) {
    throw new Error("User not found");
  }

  const { data, error } = await supabase.from("comments").insert({
    post_id: postId,
    content,
    user_id: userData.id,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
