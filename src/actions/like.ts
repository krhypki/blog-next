"use server";

import { selectUserLikedPosts, updatePostLike } from "./db/like";
import { getAuthUser } from "./db/user";
import { redirect } from "next/navigation";
import { getCurrentUserData } from "./auth";
import { revalidatePath } from "next/cache";
import { Post } from "@/lib/types/database";

export async function toggleLike(postId: Post["id"]) {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await updatePostLike(postId);

  revalidatePath("/");
  return { error };
}

export async function getCurrentUserLikes() {
  const authUser = await getAuthUser();

  if (!authUser) {
    return null;
  }

  const user = await getCurrentUserData();

  if (!user) {
    return null;
  }

  const { data, error } = await selectUserLikedPosts(user.id);

  if (error || !data) {
    redirect("/error");
  }

  return data.map((like) => like.post_id);
}
