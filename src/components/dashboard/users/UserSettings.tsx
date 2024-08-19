import UserSettingsData from "./UserSettingsData";
import UserPasswordChange from "./UserPasswordChange";
import { User } from "@/lib/types/database";

type UserSettingsProps = {
  email: User["email"];
  role: User["role"];
};

export default function UserSettings({ role, email }: UserSettingsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-[800px] pt-10">
      <UserSettingsData initialValues={{ role }} email={email} />
      <UserPasswordChange email={email} />
    </div>
  );
}
