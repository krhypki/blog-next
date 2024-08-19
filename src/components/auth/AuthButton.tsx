import Link from "next/link";
import { Button } from "../ui/button";
import LogoutButton from "./LogoutButton";

type AuthButtonProps = {
  isAuth: boolean;
};

export default function AuthButton({ isAuth }: AuthButtonProps) {
  if (isAuth) {
    return <LogoutButton />;
  }

  return (
    <Button asChild>
      <Link href="/auth">Login</Link>
    </Button>
  );
}
