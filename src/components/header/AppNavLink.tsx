import { cn } from "@/lib/utils/cn";
import Link from "next/link";

type AppNavLinkProps = {
  href: string;
  label: string;
  isActive?: boolean;
  motionId?: string;
  className?: string;
};

export function AppNavLink({ href, label, className }: AppNavLinkProps) {
  return (
    <li
      className={cn("hover:scale-110 transition-all relative pb-2", className)}
      key={href}
    >
      <Link className="p-2" href={href}>
        {label}
      </Link>
    </li>
  );
}
