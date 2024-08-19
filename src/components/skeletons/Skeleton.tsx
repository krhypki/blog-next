import { cn } from "@/lib/utils/cn";

export default function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-4 w-full rounded-md bg-slate-900/50 animate-pulse",
        className
      )}
    />
  );
}
