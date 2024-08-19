"use client";

import Heading from "@/components/general/Heading";
import PostCommentForm from "./PostCommentForm";
import PostCommentList from "./PostCommentList";
import { useOptimistic } from "react";
import Link from "next/link";
import { Comment, Post, User } from "@/lib/types/database";

type PostCommentsProps = {
  postId: Post["id"];
  comments: Comment[];
  userData: User;
};

export default function PostComments({
  postId,
  comments,
  userData,
}: PostCommentsProps) {
  const [optimisticComments, setOptimisticComments] =
    useOptimistic<Comment[]>(comments);

  const handleNewPostAdd = (formData: FormData) => {
    const content = formData.get("content");

    if (typeof content !== "string") {
      return;
    }

    const newPost = {
      post_id: postId,
      created_at: new Date().toString(),
      id: new Date().getTime(),
      user_id: userData.id,
      user: userData,
      content,
    };

    setOptimisticComments([...optimisticComments, newPost]);
  };

  return (
    <div>
      <Heading tag="h2" variant="h4" className="mb-4">
        Comments
      </Heading>

      {!userData && (
        <p>
          <Link href="/auth" className="font-semibold text-slate-600">
            Login
          </Link>{" "}
          to add a comment.
        </p>
      )}

      {userData && (
        <PostCommentForm postId={postId} onNewCommentAdd={handleNewPostAdd} />
      )}

      <PostCommentList comments={optimisticComments} />
    </div>
  );
}
