import { getAllUsers } from "@/actions/user";
import UsersList from "@/components/dashboard/users/UsersList";
import Heading from "@/components/general/Heading";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${APP_NAME} - Users`,
  description: "Users",
};

export default async function DashboardUsersPage() {
  const users = await getAllUsers();
  return (
    <>
      <Heading tag="h1">List of all users</Heading>
      <UsersList users={users} />
    </>
  );
}
