"use server";

import {
  findUserById,
  findUsers,
  getAuthUser,
  updateUserData,
  updateUserPassword,
} from "./db/user";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { getCurrentUserData, logout } from "./auth";
import { imageSchema } from "@/lib/zod/general";
import { passwordSchema, profileSchema } from "@/lib/zod/user";
import { validateFormData } from "@/lib/utils/validateFormData";
import { getErrorMessage } from "@/lib/utils/error";
import { ImageStorageAction } from "@/lib/types/image";
import { uploadImage } from "./db/image";
import { findPostsByEmail } from "./db/post";
import { User, UserRole } from "@/lib/types/database";
import { deleteUser } from "./db/admin";

export async function uploadAvatar(
  formData: unknown,
  action: ImageStorageAction = "upload"
) {
  const validatedData = validateFormData(formData, imageSchema);

  if ("error" in validatedData) {
    return validatedData.error;
  }

  const user = await getAuthUser();
  if (!user) {
    redirect("/login");
  }

  const { data: avatar, error } = await uploadImage(
    validatedData.image,
    user.id,
    "avatars",
    action
  );

  await updateUserData(user.email!, { avatar: avatar?.path });

  revalidatePath("/dashboard/account");
}

export async function updateUserProfile(formData: unknown) {
  const user = await getAuthUser();
  if (!user) {
    redirect("/login");
  }
  const validatedData = validateFormData(formData, profileSchema);
  if ("error" in validatedData) {
    return {
      error: validatedData.error,
    };
  }
  await updateUserData(user.email!, validatedData);
  revalidatePath("/dashboard/account");
}

export async function changePassword(formData: unknown) {
  const user = await getAuthUser();
  if (!user) {
    redirect("/login");
  }
  const validatedData = validateFormData(formData, passwordSchema);
  if ("error" in validatedData) {
    return {
      error: validatedData.error,
    };
  }

  await updateUserPassword(validatedData.password);
}

export async function getUserPosts() {
  const user = await getAuthUser();
  if (!user) {
    redirect("/login");
  }

  const { data: posts } = await findPostsByEmail(user.email!);
  return posts || [];
}

export async function getAllUsers() {
  const user = await getCurrentUserData();

  if (user.role !== UserRole.ADMIN) {
    redirect("/dashboard/home");
  }

  const { data: users, error } = await findUsers();

  if (error) {
    redirect("/error");
  }

  return users;
}

export async function getUserData(id: User["id"]) {
  const { data, error } = await findUserById(id);

  if (error) {
    redirect("/error");
  }

  if (!data) {
    notFound();
  }

  return data;
}

export async function removeAuthAccount() {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await deleteUser(user.email!, user.id);

  if (error) {
    return { error: getErrorMessage(error) };
  }

  await logout();
}
