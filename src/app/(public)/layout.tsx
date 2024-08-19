import { getAuthUser } from "@/actions/db/user";
import AuthDialog from "@/components/auth/AuthDialog";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";
import { ReactNode } from "react";

type PublicLayoutProps = {
  children?: ReactNode;
};

export const metadata: Metadata = {
  title: APP_NAME,
  description: "Connect with other people and share your thoughts with them.",
};

export default async function PublicLayout({ children }: PublicLayoutProps) {
  const user = await getAuthUser();

  return (
    <div className="py-12 min-h-screen">
      {children}
      {!user && <AuthDialog />}
    </div>
  );
}
