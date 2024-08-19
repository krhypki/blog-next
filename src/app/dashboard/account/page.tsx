import AccountProfile from "@/components/dashboard/account/AccountProfile";
import AccountSettings from "@/components/dashboard/account/AccountSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${APP_NAME} - Account`,
};

export default function AccountPage() {
  return (
    <div>
      <Tabs defaultValue="profile">
        <TabsList className="mb-16">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <AccountProfile />
        </TabsContent>
        <TabsContent value="settings">
          <AccountSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
