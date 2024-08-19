"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { getFullName } from "@/lib/utils/stringUtils";
import { getDate } from "@/lib/utils/datetime";
import PostThumbnail from "./PostThumbnail";
import PostMetadata from "./PostMetadata";
import { Badge } from "../ui/badge";
import Heading from "../general/Heading";
import { cn } from "@/lib/utils/cn";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { MdOutlineChat } from "react-icons/md";
import { Button } from "../ui/button";
import { toggleLike } from "@/actions/like";
import { toast } from "sonner";
import { startTransition, useOptimistic } from "react";
import TagList from "./TagList";
import { usePathname, useRouter } from "next/navigation";
import { PostWithRelations } from "@/lib/types/database";

type PostCardProps = {
  post: PostWithRelations;
  className?: string;
  displayThumbnail?: boolean;
  includeSocialData?: boolean;
  includeMetadata?: boolean;
  isLiked?: boolean;
  displayAuthDialog?: boolean;
};

export default function PostCard({
  post,
  includeMetadata,
  includeSocialData,
  displayThumbnail,
  isLiked,
  className,
  displayAuthDialog,
}: PostCardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(isLiked);
  const [optimisticTotalLikes, setOptimisticTotalLikes] = useOptimistic(
    post.likes_count
  );

  const handleLikeToggle = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (displayAuthDialog) {
      router.replace(`${pathname}?auth-dialog=true`);
      return;
    }

    startTransition(() => {
      setOptimisticLiked(!isLiked);
      setOptimisticTotalLikes(
        isLiked ? post.likes_count - 1 : post.likes_count + 1
      );
    });

    const response = await toggleLike(post.id);

    if (response.error) {
      toast.error("Something went wrong, try again later");
    }
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="relative pt-0 pb-10 px-0 space-y-0">
        <Badge className="absolute top-2 right-2 z-10">
          {post.category.name}
        </Badge>
        {post.thumbnail && displayThumbnail && (
          <div className="relative w-full h-[280px] bg-slate-100">
            <PostThumbnail src={post.thumbnail} alt={post.title} priority />
          </div>
        )}
      </CardHeader>
      <CardContent>
        {includeMetadata && (
          <PostMetadata
            avatar={post.user.avatar}
            author={getFullName(post.user)}
            date={getDate(post.created_at)}
          />
        )}

        <Heading tag="h3">{post.title}</Heading>
        {!!post.tags.length && <TagList tags={post.tags} />}
        <p>{post.intro}</p>
      </CardContent>

      {includeSocialData && (
        <CardFooter>
          <div className="flex items-center space-x-4 text-sm gap-x-6">
            <Button
              onClick={handleLikeToggle}
              variant="ghost"
              className="flex items-center gap-2"
            >
              {optimisticLiked ? <HeartFilledIcon /> : <HeartIcon />}{" "}
              {optimisticTotalLikes} likes
            </Button>
            <span className="flex items-center gap-2">
              <MdOutlineChat />
              {post.comments.length} comments
            </span>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
