import DashboardCard from "../DashboardCard";
import ChangePasswordForm from "./ChangePasswordForm";
import RemoveAccount from "./RemoveAccount";

export default function AccountSettings() {
  return (
    <DashboardCard heading="Account settings">
      <ChangePasswordForm />
      <RemoveAccount />
    </DashboardCard>
  );
}
