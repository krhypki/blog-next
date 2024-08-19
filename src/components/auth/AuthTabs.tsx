import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AuthForm from "./AuthForm";

const tabs = ["login", "signup"] as const;

export default function AuthTabs() {
  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab} value={tab}>
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab} value={tab}>
          <AuthForm actionType={tab} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
