import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import React from "react";

type SidebarItemProps = {
  Icon: React.ElementType;
  label: string;
  href: string;
  isActive: boolean;
};

export default function SidebarItem({
  Icon,
  label,
  href,
  isActive,
}: SidebarItemProps) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "flex items-center gap-x-4 py-3 hover:bg-secondary px-4",
          { "bg-secondary-foreground/10": isActive }
        )}
      >
        <Icon />
        {label}
      </Link>
    </li>
  );
}
