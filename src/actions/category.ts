"use server";

import { redirect } from "next/navigation";
import { findAllCategories } from "./db/category";

export async function getAllCategories() {
  const { data, error } = await findAllCategories();

  if (error || !data) {
    redirect("/error");
  }

  return data;
}
