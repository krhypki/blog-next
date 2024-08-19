import { getUserData } from "@/actions/user";
import UserActivity from "@/components/dashboard/users/UserActivity";
import UserSettings from "@/components/dashboard/users/UserSettings";
import Heading from "@/components/general/Heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notFound } from "next/navigation";

type DashboardUserPageProps = {
  params: {
    id: string;
  };
};

export default async function DashboardUserPage({
  params,
}: DashboardUserPageProps) {
  const id = Number(params.id);

  if (isNaN(id)) {
    notFound();
  }

  const user = await getUserData(Number(id));

  return (
    <>
      <Heading tag="h1" className="mb-16">
        account information: <span className="lowercase">{user.email}</span>
      </Heading>
      <Tabs defaultValue="activity">
        <TabsList className="mb-8">
          <TabsTrigger value="activity">activity</TabsTrigger>
          <TabsTrigger value="settings">settings</TabsTrigger>
        </TabsList>

        <TabsContent value="activity">
          <UserActivity posts={user.post} comments={user.comments} />
        </TabsContent>

        <TabsContent value="settings">
          <UserSettings email={user.email} role={user.role} />
        </TabsContent>
      </Tabs>
    </>
  );
}
