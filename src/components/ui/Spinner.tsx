import { cn } from "@/lib/utils/cn";

type SpinnerProps = {
  className?: string;
};

export default function Spinner({ className }: SpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin h-20 w-20 border-2 border-b-0 border-primary border-l-0 rounded-full",
        className
      )}
    ></div>
  );
}
