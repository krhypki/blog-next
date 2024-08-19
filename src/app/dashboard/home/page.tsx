import { getUserPosts } from "@/actions/user";
import DashboardPostList from "@/components/dashboard/posts/DashboardPostList";
import Heading from "@/components/general/Heading";

export default async function DashboardPage() {
  const posts = await getUserPosts();

  return (
    <>
      <Heading tag="h2">your posts</Heading>
      <DashboardPostList initialPosts={posts} />
    </>
  );
}
