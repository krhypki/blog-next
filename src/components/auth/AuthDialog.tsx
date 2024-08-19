"use client";

import { Dialog, DialogClose, DialogContent } from "../ui/dialog";
import AuthTabs from "./AuthTabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function AuthDialog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isOpen = !!searchParams.get("auth-dialog");

  const handleOpenChange = () => {
    if (isOpen) {
      router.replace(pathname);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="flex justify-center py-8">
        <AuthTabs />
      </DialogContent>
      <DialogClose />
    </Dialog>
  );
}
