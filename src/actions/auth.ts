"use server";

import {
  createUser,
  findUserByEmail,
  getAuthUser,
  signInWithPassword,
  signOut,
  signUp,
} from "./db/user";
import { validateFormData } from "@/lib/utils/validateFormData";
import { authSchema } from "@/lib/zod/user";
import { AuthResponse } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { z } from "zod";

async function auth(
  formData: unknown,
  handler: (data: z.infer<typeof authSchema>) => Promise<AuthResponse>
) {
  const validatedData = validateFormData(formData, authSchema);

  if ("error" in validatedData) {
    return validatedData;
  }

  const { data, error } = await handler(validatedData);

  if (error) {
    return {
      error: error.message,
    };
  }

  return data;
}

export async function login(formData: unknown) {
  const response = await auth(formData, signInWithPassword);

  if ("error" in response) {
    return response;
  }

  redirect("/");
}

export async function signup(formData: unknown) {
  const response = await auth(formData, signUp);

  if ("error" in response) {
    return response;
  }

  const email = response.user?.email;

  if (email) {
    await createUser(email);
    redirect("/");
  } else {
    redirect("/error");
  }
}

export async function logout() {
  await signOut();
  redirect("/");
}

export async function getCurrentUserData() {
  const currentUser = await getAuthUser();

  if (!currentUser?.email) {
    return null;
  }

  const { error, data } = await findUserByEmail(currentUser.email);

  if (error) {
    redirect("/error");
  }

  return data;
}
