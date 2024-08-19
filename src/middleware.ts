import { updateSession } from "@/lib/utils/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUserData } from "./actions/auth";
import { isArrayItemInString } from "./lib/utils/stringUtils";
import { UserRole } from "./lib/types/database";

const authPages = ["/dashboard"];
const adminPages = ["/dasboard/users"];
const authorPages = ["/dashboard/posts"];

export async function middleware(request: NextRequest) {
  const user = await getCurrentUserData();
  const { pathname, origin } = request.nextUrl;

  if (!user && isArrayItemInString(pathname, authPages)) {
    return NextResponse.redirect(new URL("/", origin));
  }

  if (
    user?.role !== UserRole.ADMIN &&
    isArrayItemInString(pathname, adminPages)
  ) {
    return NextResponse.redirect(new URL("/dashboard", origin));
  }

  if (
    user?.role === UserRole.USER &&
    isArrayItemInString(pathname, authorPages)
  ) {
    return NextResponse.redirect(new URL("/dashboard", origin));
  }

  if (pathname.includes("/auth") && user) {
    return NextResponse.redirect(new URL("/", origin));
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
