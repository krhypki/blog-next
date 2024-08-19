import { z } from "zod";
import { postSchema } from "../zod/post";
import { Database } from "./supabase.types";

export type AuthType = "signup" | "login";
export enum UserRole {
  USER = "USER",
  AUTHOR = "AUTHOR",
  ADMIN = "ADMIN",
}

export type PostSchema = z.infer<typeof postSchema>;
export type PostFormSchema = Omit<
  PostSchema,
  "authorId" | "published" | "date"
>;

export type Category = Database["public"]["Tables"]["category"]["Row"];
export type Post = Database["public"]["Tables"]["post"]["Row"];
export type User = Database["public"]["Tables"]["user"]["Row"];
export type Comment = Database["public"]["Tables"]["comments"]["Row"] & {
  user: User;
};
export type PostLike = Database["public"]["Tables"]["likes"]["Row"];

export type PostWithCategory = Post & { category: Category };
export type PostWithCategoryUser = Post & { category: Category; user: User };
export type PostWithRelations = Post & {
  likes_count: number;
  category: Category;
  user: User;
  comments: Comment[];
};

export enum PostSortBy {
  Popular = "popular",
  Latest = "latest",
  Liked = "liked",
}
