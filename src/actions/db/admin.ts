"use server";

import { User } from "@/lib/types/database";
import { createClient } from "@/lib/utils/supabase/server";
import { AuthUser } from "@supabase/supabase-js";

export async function deleteUser(email: User["email"], id: AuthUser["id"]) {
  const supabase = createClient();
  const { error, data } = await supabase
    .from("user")
    .delete()
    .eq("email", email);

  if (!error) {
    await supabase.auth.admin.deleteUser(id);
  }

  return { error, data };
}

export async function updateUserPassword(
  email: AuthUser["email"],
  newPassword: string
) {
  const supabase = createClient();
  const { id: userId, error: userIdError } = await getUserIdByEmail(email);

  if (userIdError) {
    return { userIdError };
  }

  const { error, data } = await supabase.auth.admin.updateUserById(userId, {
    password: newPassword,
  });

  return { error, data };
}

export async function getUserIdByEmail(email: AuthUser["email"]) {
  const supabase = createClient();

  const { data, error } = await supabase
    .rpc("get_user_id_by_email", { email })
    .maybeSingle();

  const authUserData = data as AuthUser;
  return { id: authUserData.id, error };
}
