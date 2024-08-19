import DashboardPostList from "../posts/DashboardPostList";
import Heading from "@/components/general/Heading";
import CommentsList from "@/components/post/comment/CommentsList";
import { Comment, PostWithRelations } from "@/lib/types/database";

type UserActivityProps = {
  posts: PostWithRelations[];
  comments: Comment[];
};

export default function UserActivity({ comments, posts }: UserActivityProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
      <div>
        <Heading tag="h2">Posts</Heading>
        <DashboardPostList
          className="!grid-cols-1"
          initialPosts={posts}
          includeMetadata={false}
        />
      </div>

      <div>
        <Heading tag="h2">Comments</Heading>
        <CommentsList comments={comments} includeAuthor={false} />
      </div>
    </div>
  );
}
