import Link from "next/link";
import PostListEmptyState from "@/components/post/PostListEmptyState";
import PostCard from "@/components/post/PostCard";
import { cn } from "@/lib/utils/cn";
import { getPosts } from "@/actions/post";
import { SearchParams } from "@/lib/types/general";
import { PostWithRelations } from "@/lib/types/database";

type DashboardPostListProps = {
  searchParams?: SearchParams;
  includeMetadata?: boolean;
  className?: string;
  initialPosts?: PostWithRelations[];
};

export default async function DashboardPostList({
  searchParams,
  includeMetadata = true,
  initialPosts,
  className,
}: DashboardPostListProps) {
  let posts;

  if (initialPosts) {
    posts = initialPosts;
  } else {
    posts = (await getPosts(searchParams)) || [];
  }

  if (posts.length === 0) {
    return <PostListEmptyState />;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
        className
      )}
    >
      {posts.map((post) => (
        <Link href={`/dashboard/posts/edit/${post.id}`} key={post.id}>
          <PostCard
            post={post}
            includeMetadata={includeMetadata}
            includeSocialData={false}
            displayThumbnail={false}
            className="h-full"
          />
        </Link>
      ))}
    </div>
  );
}
