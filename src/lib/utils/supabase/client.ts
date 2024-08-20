import { createBrowserClient } from "@supabase/ssr";
import { Database } from "../../types/supabase.types";

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
}

export const supabase = createClient();
