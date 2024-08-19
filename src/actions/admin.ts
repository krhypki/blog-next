"use server";

import { getErrorMessage } from "@/lib/utils/error";

import { validateFormData } from "@/lib/utils/validateFormData";
import { userSettingsSchema } from "@/lib/zod/user";
import { AuthUser } from "@supabase/supabase-js";
import { getCurrentUserData } from "./auth";
import { User, UserRole } from "@/lib/types/database";
import { deleteUser, updateUserPassword } from "./db/admin";
import { updateUserData } from "./db/user";

async function isAdmin() {
  const authenticatedUser = await getCurrentUserData();
  return authenticatedUser.role === UserRole.ADMIN;
}

export async function removeAccount(email: User["email"], id: AuthUser["id"]) {
  if (!isAdmin) {
    return "Unauthorized";
  }

  const { error } = await deleteUser(email, id);
  if (error) {
    return getErrorMessage(error);
  }
}

export async function updateUserSettings(
  email: User["email"],
  formData: unknown
) {
  if (!isAdmin) {
    return "Unauthorized";
  }

  const validatedData = validateFormData(formData, userSettingsSchema);

  if ("error" in validatedData) {
    return "Invalid data";
  }

  const { error } = await updateUserData(email, validatedData);
  if (error) {
    return getErrorMessage(error);
  }
}

export async function changeUserPassword(
  email: AuthUser["email"],
  newPassword: string
) {
  if (!isAdmin) {
    return "Unathorized";
  }

  const { error } = await updateUserPassword(email, newPassword);
  if (error) {
    return getErrorMessage(error);
  }
}
