"use server";

import { User } from "@/lib/types/database";
import { createClient } from "@/lib/utils/supabase/server";
import {
  QueryData,
  SignInWithPasswordCredentials,
} from "@supabase/supabase-js";

export async function getAuthUser() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
}

export async function signUp(credentials: SignInWithPasswordCredentials) {
  const supabase = createClient();
  const data = await supabase.auth.signUp({
    ...credentials,
    options: {
      data: {
        role: 1,
      },
    },
  });
  return data;
}

export async function signInWithPassword(
  credentials: SignInWithPasswordCredentials
) {
  const supabase = createClient();
  const data = await supabase.auth.signInWithPassword(credentials);
  return data;
}

export async function createUser(email: User["email"]) {
  const supabase = createClient();
  const { data, error } = await supabase.from("user").insert({ email });
  return { data, error };
}

export async function updateUserData(
  email: User["email"],
  newData: Partial<User>
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user")
    .update(newData)
    .eq("email", email)
    .select();

  return { data, error };
}

export async function findUserByEmail(email: User["email"]) {
  const supabase = createClient();
  const userQuery = supabase
    .from("user")
    .select()
    .eq("email", email)
    .maybeSingle();
  type UserData = QueryData<typeof userQuery>;

  const { data, error } = await userQuery;
  const userData = data as UserData;

  return { data: userData, error };
}

export async function updateUserPassword(password: string) {
  const supabase = createClient();
  return await supabase.auth.updateUser({ password });
}

export async function findUsers() {
  const supabase = createClient();
  const { data, error } = await supabase.from("user").select();
  const users = data as User[];

  return { data: users, error };
}

export async function findUserById(id: User["id"]) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user")
    .select("*, post(*, category(*)), comments(*)")
    .eq("id", id)
    .maybeSingle();

  return { data, error };
}
