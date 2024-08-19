import Link from "next/link";
import PostCard from "./PostCard";
import { slugify } from "@/lib/utils/slugify";
import { cn } from "@/lib/utils/cn";
import PostListEmptyState from "./PostListEmptyState";
import { getCurrentUserLikes } from "@/actions/like";
import { getPosts } from "@/actions/post";
import { SearchParams } from "@/lib/types/general";

type PostListProps = {
  className?: string;
  searchParams: SearchParams;
};

export default async function PostList({
  className,
  searchParams,
}: PostListProps) {
  const posts = await getPosts(searchParams);
  const currentUserLikes = await getCurrentUserLikes();

  if (posts.length === 0) {
    return <PostListEmptyState />;
  }

  return (
    <div className={cn("grid grid-cols-1 gap-4", className)}>
      {posts.map((post, index) => (
        <Link href={`/post/${slugify(post.title)}-${post.id}`} key={post.id}>
          <PostCard
            className="w-[640px] max-w-full"
            post={post}
            displayThumbnail={index === 0}
            includeMetadata
            includeSocialData
            displayAuthDialog={!currentUserLikes}
            isLiked={currentUserLikes?.includes(post.id)}
          />
        </Link>
      ))}
    </div>
  );
}
