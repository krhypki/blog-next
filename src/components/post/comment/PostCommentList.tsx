"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import PostCommentItem from "./PostCommentItem";
import { Comment } from "@/lib/types/database";

type PostCommentListProps = {
  comments: Comment[];
};

export default function PostCommentList({ comments }: PostCommentListProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sortedComments = useMemo(() => {
    return comments.sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
  }, [comments]);

  if (comments.length <= 3) {
    return (
      <div className="mt-8">
        {sortedComments.map((comment) => (
          <PostCommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    );
  }

  const defaultComments = [...sortedComments].splice(0, 3);
  const collapsibleComments = [...sortedComments].splice(3);

  return (
    <div className="mt-8">
      {defaultComments.map((comment) => (
        <PostCommentItem key={comment.id} comment={comment} />
      ))}
      <Collapsible>
        <CollapsibleContent>
          {collapsibleComments.map((comment) => (
            <PostCommentItem key={comment.id} comment={comment} />
          ))}
        </CollapsibleContent>
        <div className="flex justify-center">
          <CollapsibleTrigger asChild>
            <Button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="mt-6"
            >
              {isCollapsed ? "Show less" : "Show all"}
            </Button>
          </CollapsibleTrigger>
        </div>
      </Collapsible>
    </div>
  );
}
