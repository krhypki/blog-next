"use client";

import { addNewComment } from "@/actions/comment";
import SubmitInput from "@/components/general/SubmitInput";
import { Post } from "@/lib/types/database";
import { useRef } from "react";
import { toast } from "sonner";

type PostCommentFormProps = {
  postId: Post["id"];
  onNewCommentAdd: (formData: FormData) => void;
};

export default function PostCommentForm({
  onNewCommentAdd,
  postId,
}: PostCommentFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData: FormData) => {
        onNewCommentAdd(formData);
        const response = await addNewComment(postId, formData);

        if (response?.error) {
          toast.error(response.error);
          return;
        }

        formRef.current?.reset();
      }}
    >
      <SubmitInput type="text" placeholder="Add a comment" name="content" />
    </form>
  );
}
