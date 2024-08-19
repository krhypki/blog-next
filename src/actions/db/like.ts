"use server";

import { Post, User } from "@/lib/types/database";
import { getCurrentUserData } from "@/actions/auth";
import { createClient } from "@/lib/utils/supabase/server";

export async function updatePostLike(postId: Post["id"]) {
  const supabase = createClient();
  const userData = await getCurrentUserData();

  if (!userData) {
    return {
      error: "User not found",
    };
  }

  const existingLike = await supabase
    .from("likes")
    .select()
    .eq("post_id", postId)
    .eq("user_id", userData.id)
    .maybeSingle();

  if (existingLike.data) {
    const { data, error } = await supabase
      .from("likes")
      .delete()
      .eq("id", existingLike.data.id);
    return { data, error };
  }

  const { data, error } = await supabase.from("likes").insert({
    post_id: postId,
    user_id: userData.id,
  });

  return { data, error };
}

export async function selectUserLikedPosts(userId: User["id"]) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("likes")
    .select("post_id")
    .eq("user_id", userId);

  return { data, error };
}
