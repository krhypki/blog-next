"use server";

import { getImageUrl } from "@/lib/utils/stringUtils";
import { getStringValueFromParam } from "@/lib/utils/searchParams";
import {
  findAllPosts,
  findLastPost,
  findPostById,
  findPostsByParams,
  insertPost,
  updatePost,
} from "./db/post";
import { imageSchema } from "@/lib/zod/general";
import { postEssentialsSchema } from "@/lib/zod/post";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { validateFormData } from "@/lib/utils/validateFormData";
import { SearchParams } from "@/lib/types/general";
import { Post, PostFormSchema, PostSortBy } from "@/lib/types/database";
import { uploadImage } from "./db/image";
import { getErrorMessage } from "@/lib/utils/error";

export async function getPosts(params?: SearchParams) {
  try {
    if (!params || !Object.keys(params).length) {
      return await findAllPosts();
    }

    const published =
      typeof params.published === "undefined"
        ? undefined
        : params.published === "true";
    const searchText = getStringValueFromParam(params.query);
    const category = getStringValueFromParam(params.category);
    let sort = getStringValueFromParam(params.sort);

    if (!Object.values(PostSortBy).includes(sort as PostSortBy)) {
      sort = PostSortBy.Latest;
    }

    return findPostsByParams({
      searchText,
      categoryName: category,
      published,
      sort: sort as PostSortBy,
    });
  } catch (err) {
    return [];
  }
}

export async function getPostById(id: Post["id"]) {
  let post;

  try {
    post = await findPostById(id);
  } catch {
    redirect("/error");
  }

  if (!post) {
    return notFound();
  }

  return post;
}

export async function addPost(values: PostFormSchema, publish: boolean) {
  const validatedValues = validateFormData(values, postEssentialsSchema);

  if ("error" in validatedValues) {
    return {
      error: validatedValues.error,
    };
  }

  const { error } = await insertPost(validatedValues, publish);

  if (!error) {
    revalidatePath("/dashboard/posts");
  }

  return { error };
}

export async function editPost({
  id,
  postData,
  publish,
}: {
  id: Post["id"];
  postData: PostFormSchema;
  publish?: boolean;
}) {
  const validatedData = validateFormData(postData, postEssentialsSchema);

  if ("error" in validatedData) {
    return {
      error: validatedData.error,
    };
  }

  const post = await updatePost({ id, data: validatedData, publish });
  revalidatePath("/dashboard/posts");

  return post;
}

export async function uploadThumbnail(file: FormData) {
  const validatedData = validateFormData(file, imageSchema);

  if ("error" in validatedData) {
    return {
      error: getErrorMessage(validatedData.error),
    };
  }

  const { data: lastPost, error: lastPostError } = await findLastPost();

  if (lastPostError) {
    return {
      error: getErrorMessage(lastPostError),
    };
  }

  const imageName = `post${lastPost?.id || 0 + 1}`;

  const { data, error } = await uploadImage(
    validatedData.image,
    imageName,
    "thumbnails"
  );

  if (!data) {
    return {
      error: getErrorMessage(error),
    };
  }

  const imageUrl = getImageUrl("thumbnails", data.path);
  return { imageUrl };
}

export async function getLatestPosts() {
  try {
    return await findAllPosts(5);
  } catch {
    redirect("/error");
  }
}
