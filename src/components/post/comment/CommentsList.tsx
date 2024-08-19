import { Comment } from "@/lib/types/database";
import PostCommentItem from "./PostCommentItem";

type CommentsListProps = {
  comments: Comment[];
  includeAuthor?: boolean;
};

export default function CommentsList({
  comments,
  includeAuthor = true,
}: CommentsListProps) {
  if (!comments.length) {
    return <p>No comments found</p>;
  }

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <PostCommentItem comment={comment} includeAuthor={includeAuthor} />
        </li>
      ))}
    </ul>
  );
}
