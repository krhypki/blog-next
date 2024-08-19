"use server";

import {
  Category,
  Post,
  PostFormSchema,
  PostSortBy,
  PostWithRelations,
  User,
} from "@/lib/types/database";
import { findCategoryByName } from "./category";
import { findUserByEmail, getAuthUser } from "./user";
import { type SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/utils/supabase/server";

type PostListReturnType = {
  data?: PostWithRelations[] | null;
  error?: string;
};

function selectPostWithRelations(supabaseClient: SupabaseClient) {
  return supabaseClient
    .from("post")
    .select(
      "*, category(id, name), user(*), likes_count, liked_by, comments(*, user(*))"
    );
}

export async function findAllPosts(
  limit?: number,
  published?: boolean
): Promise<PostWithRelations[]> {
  const supabase = createClient();
  let query = selectPostWithRelations(supabase).order("created_at", {
    ascending: false,
  });

  if (limit) {
    query = query.limit(limit);
  }

  if (published !== undefined) {
    query = query.eq("published", published);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function findPostsPerPage(
  itemsPerPage: number,
  currentPage: number
): Promise<PostWithRelations[]> {
  const supabase = createClient();
  const { data, error } = await selectPostWithRelations(supabase)
    .order("id", { ascending: true })
    .range(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage - 1);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function findPostsByParams({
  searchText,
  categoryName,
  sort,
  published,
}: {
  searchText?: string;
  categoryName?: Category["name"];
  sort?: PostSortBy;
  published?: boolean;
}): Promise<PostWithRelations[]> {
  const supabase = createClient();
  let query = selectPostWithRelations(supabase);

  if (categoryName) {
    const category = await findCategoryByName(categoryName);

    if (category) {
      query = query.eq("category_id", category.id);
    }
  }

  if (searchText) {
    query = query.textSearch(
      "title_intro_content",
      searchText.replace(/\s/g, "+")
    );
  }

  if (sort) {
    let orderBy;

    switch (sort) {
      case PostSortBy.Latest:
        orderBy = "created_at";
        break;
      case PostSortBy.Popular:
        orderBy = "comments_count";
        break;
      case PostSortBy.Liked:
        orderBy = "likes_count";
        break;
      default:
        orderBy = "created_at";
    }

    query.order(orderBy, { ascending: false });
  }

  if (typeof published === "boolean") {
    query = query.eq("published", published);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function findPostById(id: Post["id"]): Promise<PostWithRelations> {
  const supabase = createClient();
  const query = selectPostWithRelations(supabase);
  const { data, error } = await query.eq("id", id).single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function findLastPost() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("post")
    .select("*")
    .order("id", { ascending: false })
    .limit(1)
    .maybeSingle();

  return { data, error };
}

export async function insertPost(values: PostFormSchema, publish: boolean) {
  const supabase = createClient();
  const session = await getAuthUser();

  if (!session || !session.email) {
    throw new Error("User not found");
  }

  const { data: userData } = await findUserByEmail(session.email);
  const categoryData = await findCategoryByName(values.category.name);

  if (!userData || !categoryData) {
    return {
      error: "Invalid form data",
    };
  }

  const { category, ...rest } = values;

  const { error } = await supabase.from("post").insert({
    ...rest,
    user_id: userData.id,
    category_id: categoryData.id,
    published: publish,
  });

  return {
    error: error?.message,
  };
}

export async function updatePost({
  id,
  data,
  publish,
}: {
  id: Post["id"];
  data: PostFormSchema;
  publish?: boolean;
}) {
  const supabase = createClient();
  const authUser = await getAuthUser();

  if (!authUser) {
    return {
      error: "Not authorized",
    };
  }

  const post = await findPostById(id);

  if (!post) {
    return {
      error: "Post not found",
    };
  }

  const { category, ...rest } = data;

  const { error } = await supabase
    .from("post")
    .update({ ...rest, category_id: category.id, published: publish })
    .eq("id", id)
    .select();

  return {
    error: error?.message,
  };
}

export async function findPostsByEmail(
  email: User["email"]
): Promise<PostListReturnType> {
  const { data: userData } = await findUserByEmail(email);

  if (!userData) {
    return {
      error: "User not found",
    };
  }

  const supabase = createClient();
  const { data, error } = await selectPostWithRelations(supabase).eq(
    "user_id",
    userData.id
  );

  return { error: error?.message, data };
}
