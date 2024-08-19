"use server";

import { ImageStorageAction, ImageStorageName } from "@/lib/types/image";
import { createClient } from "@/lib/utils/supabase/server";

export async function uploadImage(
  image: File,
  name: string,
  storage: ImageStorageName,
  action: ImageStorageAction = "upload"
) {
  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from(storage)
    [action](`public/${name}.webp`, image, {
      cacheControl: "0",
      upsert: true,
    });

  return { data, error };
}
