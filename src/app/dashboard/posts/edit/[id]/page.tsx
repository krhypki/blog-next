import { getAllCategories } from "@/actions/category";
import { getPostById } from "@/actions/post";
import PostEditView from "@/components/dashboard/posts/PostEditView";
import Heading from "@/components/general/Heading";
import NewPostContextProvider from "@/contexts/NewPostContextProvider";
import { APP_NAME } from "@/lib/constants";
import { postEssentialsSchema } from "@/lib/zod/post";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type PostEditPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params,
}: PostEditPageProps): Promise<Metadata> {
  const post = await getPostById(+params.id);

  return {
    title: `${APP_NAME} - Edit ${post.title}`,
    description: post.intro,
  };
}

export default async function PostEditPage({ params }: PostEditPageProps) {
  if (!params.id) {
    return notFound();
  }
  const post = await getPostById(+params.id);
  const categories = await getAllCategories();
  const parsedPostData = postEssentialsSchema.safeParse(post);

  return (
    <NewPostContextProvider
      categories={categories}
      mode="edit"
      postId={post.id}
      initialValues={parsedPostData.data}
    >
      <Heading tag="h1" className="mb-14">
        add new post
      </Heading>

      <PostEditView isPublished={!!post.published} />
    </NewPostContextProvider>
  );
}
