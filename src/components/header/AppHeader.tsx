import Link from "next/link";
import AuthButton from "../auth/AuthButton";
import Container from "../general/Container";
import { FaHome } from "react-icons/fa";
import { getAuthUser } from "@/actions/db/user";

export default async function AppHeader() {
  const user = await getAuthUser();
  const isAuth = !!user?.email;

  return (
    <header className="sticky top-0 left-0 z-50 text-primary w-full bg-primary-foreground lg:px-6 py-3 border-b">
      <Container className="flex items-center justify-between">
        <Link href="/">
          <FaHome className="text-2xl" />
        </Link>

        <div className="space-x-4 lg:space-x-16">
          {isAuth && <Link href="/dashboard/home">Dashboard</Link>}
          <AuthButton isAuth={isAuth} />
        </div>
      </Container>
    </header>
  );
}
