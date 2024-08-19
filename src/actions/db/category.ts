"use server";

import { createClient } from "@/lib/utils/supabase/server";

export async function findCategory(column: string, value: string | number) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("category")
    .select("*")
    .eq(column, value)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function findCategoryById(id: number) {
  return await findCategory("id", id);
}

export async function findCategoryByName(name: string) {
  return await findCategory("name", name);
}

export async function findAllCategories() {
  const supabase = createClient();

  const { data, error } = await supabase.from("category").select("*");
  return { data, error };
}
