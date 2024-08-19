import { getAllCategories } from "@/actions/category";
import CategoryList from "@/components/category/CategoryList";
import PostList from "@/components/post/PostList";
import PostSortControls from "@/components/post/PostSortControls";
import SkeletonPostList from "@/components/skeletons/SkeletonPostList";
import Heading from "@/components/general/Heading";
import { SearchParams } from "@/lib/types/general";
import { getParamAsString } from "@/lib/utils/searchParams";
import { Suspense } from "react";
import { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";

type HomePageProps = {
  searchParams: SearchParams;
};

export const metadata: Metadata = {
  title: APP_NAME,
};

export default async function Home({ searchParams }: HomePageProps) {
  const activeCategory = getParamAsString(searchParams.category);
  const sortType = getParamAsString(searchParams.sort) || "latest";
  const categories = await getAllCategories();

  return (
    <div className="container flex justify-center">
      <div className="grid max-lg:[grid-template-areas:'category_sort''posts_posts'] [grid-template-areas:'category_posts_sort'] gap-y-16 gap-x-4 lg:gap-x-16">
        <div className="[grid-area:category]">
          <Heading tag="h3">Category:</Heading>
          <CategoryList
            categories={categories}
            active={activeCategory}
            baseUrl="/"
          />
        </div>

        <div className="flex-1 xl:min-w-[640px] [grid-area:posts]">
          <Suspense
            key={JSON.stringify(searchParams)}
            fallback={<SkeletonPostList />}
          >
            <PostList searchParams={searchParams} />
          </Suspense>
        </div>
        <div className="[grid-area:sort]">
          <Heading tag="h3">Sort by:</Heading>
          <PostSortControls active={sortType} />
        </div>
      </div>
    </div>
  );
}
