import { getAllCategories } from "@/actions/category";
import DashboardPostList from "@/components/dashboard/posts/DashboardPostList";
import PostFilterbox from "@/components/dashboard/posts/PostFilterbox";
import LoadingState from "@/components/general/LoadingState";
import Heading from "@/components/general/Heading";
import { Button } from "@/components/ui/button";
import { SearchParams } from "@/lib/types/general";
import Link from "next/link";
import { Suspense } from "react";
import { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";

type DashboardPostsPageProps = {
  searchParams: SearchParams;
};

export const metadata: Metadata = {
  title: `${APP_NAME} - Dashboard Posts`,
};

export default async function DashboardPostsPage({
  searchParams,
}: DashboardPostsPageProps) {
  const categories = await getAllCategories();

  return (
    <>
      <div className=" flex justify-between mb-16 lg:mb-6">
        <Heading tag="h1" className="mb-0">
          Posts
        </Heading>

        <Button asChild>
          <Link href="/dashboard/posts/new">New Post</Link>
        </Button>
      </div>

      <PostFilterbox categories={categories} />
      <Suspense fallback={<LoadingState />} key={JSON.stringify(searchParams)}>
        <DashboardPostList searchParams={searchParams} />
      </Suspense>
    </>
  );
}
