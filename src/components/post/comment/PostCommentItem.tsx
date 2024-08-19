import Avatar from "@/components/general/Avatar";
import { Comment } from "@/lib/types/database";
import { getDateAndTime } from "@/lib/utils/datetime";

type PostCommentProps = {
  comment: Comment;
  includeAuthor?: boolean;
};

export default function PostCommentItem({
  comment,
  includeAuthor = true,
}: PostCommentProps) {
  return (
    <div className="flex flex-col gap-y-4 border-b py-6 last-of-type:border-none">
      <div className="flex max-md:flex-col justify-between text-sm space-y-2">
        {includeAuthor && (
          <div className="flex max-lg:flex-col gap-2 lg:items-center">
            <Avatar src={comment.user.avatar} alt={comment.user.email} />
            <span>{comment.user.email}</span>
          </div>
        )}
        <span>{getDateAndTime(comment.created_at)}</span>
      </div>
      <p>{comment.content}</p>
    </div>
  );
}
