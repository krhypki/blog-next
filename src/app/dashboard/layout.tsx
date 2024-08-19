import { getCurrentUserData } from "@/actions/auth";
import DashboardSidebar from "@/components/dashboard/DashobardSidebar";
import Container from "@/components/general/Container";
import { APP_NAME, DASHBOARD_LINKS } from "@/lib/constants";
import { Metadata } from "next";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: `${APP_NAME} - Dashboard`,
  description: "Dashboard",
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUserData();
  const links = DASHBOARD_LINKS.filter((link) => {
    if (!link.access) {
      return true;
    }

    return link.access.includes(user?.role);
  });

  return (
    <div className="flex flex-1">
      <DashboardSidebar links={links} />
      <Container className="py-20 lg:py-10">{children}</Container>
    </div>
  );
}
