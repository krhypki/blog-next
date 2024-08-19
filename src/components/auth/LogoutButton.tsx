"use client";

import { logout } from "@/actions/auth";
import { Button } from "../ui/button";

export default function LogoutButton() {
  return (
    <Button variant="secondary" onClick={() => logout()}>
      Logout
    </Button>
  );
}
