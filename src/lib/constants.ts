import { UserRole } from "./types/database";

export const INVALID_FORM_DATA_RESPONSE = { error: "Invalid form data" };
export const GITHUB_REPO_URL = "https://github.com/krhypki/blog-next";
export const MAX_FILE_SIZE = 300000;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
];
export const AVATAR_PLACEHOLDER_PATH = "public/avatar-placeholder.png";
export const APP_NAME = "BlogApp";

export const DASHBOARD_LINKS = [
  {
    href: "/dashboard/home",
    label: "Dashboard",
  },
  {
    href: "/dashboard/users",
    label: "Users",
    access: [UserRole.ADMIN],
  },
  {
    href: "/dashboard/posts",
    label: "Posts",
    access: [UserRole.ADMIN, UserRole.AUTHOR],
  },
  {
    href: "/dashboard/account",
    label: "Account",
  },
];
