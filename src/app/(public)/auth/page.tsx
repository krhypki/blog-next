import AuthTabs from "@/components/auth/AuthTabs";
import Container from "@/components/general/Container";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${APP_NAME} - Auth`,
};

export default function AuthPage() {
  return (
    <Container className="flex justify-center">
      <AuthTabs />
    </Container>
  );
}
