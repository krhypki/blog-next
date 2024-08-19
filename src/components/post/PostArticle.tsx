import PostThumbnail from "./PostThumbnail";
import PostMetadata from "./PostMetadata";
import { getFullName } from "@/lib/utils/stringUtils";
import { getDate } from "@/lib/utils/datetime";
import Heading from "../general/Heading";
import TagList from "./TagList";
import PostComments from "./comment/PostComments";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostById } from "@/actions/post";
import { getCurrentUserData } from "@/actions/auth";
import { Post } from "@/lib/types/database";
import { Card, CardContent } from "../ui/card";

type PostArticleProps = {
  postId: Post["id"];
};

export default async function PostArticle({ postId }: PostArticleProps) {
  const post = await getPostById(postId);
  const userData = await getCurrentUserData();

  return (
    <Card className="max-w-[640px] mx-auto">
      <CardContent>
        <article>
          <div className="h-[300px] relative mb-2">
            <PostThumbnail src={post.thumbnail} alt={post.title} />
          </div>
          <div className="container">
            <PostMetadata
              author={getFullName(post.user)}
              date={getDate(post.created_at)}
              avatar={post.user.avatar}
            />

            <div className="mb-20">
              <Heading tag="h1">{post.title}</Heading>
              {!!post.tags.length && <TagList tags={post.tags} />}
              <MDXRemote source={post.content} />
            </div>

            <PostComments
              comments={post.comments}
              postId={post.id}
              userData={userData}
            />
          </div>
        </article>
      </CardContent>
    </Card>
  );
}
