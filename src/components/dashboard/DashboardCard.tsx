import { cn } from "@/lib/utils/cn";
import Heading from "../general/Heading";
import { Card, CardContent } from "../ui/card";

type DashboardCardProps = {
  className?: string;
  children: React.ReactNode;
  heading: string;
};

export default function DashboardCard({
  className,
  children,
  heading,
}: DashboardCardProps) {
  return (
    <>
      <Heading tag="h2">{heading}</Heading>
      <Card className="max-w-[1000px]">
        <CardContent
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-10 py-10 items-center",
            className
          )}
        >
          {children}
        </CardContent>
      </Card>
    </>
  );
}
