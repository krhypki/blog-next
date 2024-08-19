import { getPostById } from "@/actions/post";
import PostArticle from "@/components/post/PostArticle";
import SkeletonPostArticle from "@/components/skeletons/SkeletonPostArticle";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type PostPageProps = {
  params: {
    slug: string;
  };
};

function getPostId(params: PostPageProps["params"]) {
  const { slug } = params;
  return +slug.substring(slug.lastIndexOf("-") + 1);
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const id = getPostId(params);
  const post = await getPostById(id);

  return {
    title: `${APP_NAME} -  ${post.title}`,
    description: post.intro || post.content,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const id = getPostId(params);

  if (isNaN(id)) {
    return notFound();
  }

  return (
    <div className=" min-h-screen">
      <Suspense key={`post-${id}`} fallback={<SkeletonPostArticle />}>
        <PostArticle postId={id} />;
      </Suspense>
    </div>
  );
}
