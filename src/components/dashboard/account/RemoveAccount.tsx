"use client";

import { removeAuthAccount } from "@/actions/user";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { toast } from "sonner";

export default function RemoveAccount() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRemove = async () => {
    const response = await removeAuthAccount();

    if (response && "error" in response) {
      toast.error(response.error);
      return;
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" size="lg">
            Remove Account
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to remove your account?
            </DialogTitle>
            <div className="flex justify-between pt-6 pb-4">
              <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleRemove} variant="destructive">
                Remove
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
