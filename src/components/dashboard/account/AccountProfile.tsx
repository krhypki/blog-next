import { getCurrentUserData } from "@/actions/auth";
import DashboardCard from "../DashboardCard";
import AccountProfileForm from "./AccountProfileForm";
import UploadAvatarForm from "./UploadAvatarForm";

export default async function AccountProfile() {
  const user = await getCurrentUserData();
  return (
    <div>
      <DashboardCard heading="Update profile information">
        <AccountProfileForm
          firstName={user.firstName}
          lastName={user.lastName}
        />
        <UploadAvatarForm avatarPath={user.avatar} />
      </DashboardCard>
    </div>
  );
}
