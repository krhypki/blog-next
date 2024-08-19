import { getCurrentUserData } from "@/actions/auth";
import { getAllCategories } from "@/actions/category";
import MissingProfileInfo from "@/components/dashboard/account/MissingProfileInfo";
import PostEditView from "@/components/dashboard/posts/PostEditView";
import Heading from "@/components/general/Heading";
import NewPostContextProvider from "@/contexts/NewPostContextProvider";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${APP_NAME} - Add new post`,
};

export default async function DashboardAddPostPage() {
  const categories = await getAllCategories();
  const currentUser = await getCurrentUserData();
  const hasAccountInfo = currentUser.firstName && currentUser.lastName;

  return (
    <NewPostContextProvider mode="add" categories={categories}>
      <Heading tag="h1" className="mb-14">
        add new post
      </Heading>

      {!hasAccountInfo && <MissingProfileInfo />}

      {hasAccountInfo && <PostEditView />}
    </NewPostContextProvider>
  );
}
