import { Button } from "../ui/button";
import Link from "next/link";

type CategoryItemProps = {
  category: string;
  isActive?: boolean;
  url: string;
};

export default function CategoryItem({
  category,
  url,
  isActive = false,
}: CategoryItemProps) {
  return (
    <Button
      variant={isActive ? "default" : "secondary"}
      className="uppercase"
      asChild
    >
      <Link href={url}>{category}</Link>
    </Button>
  );
}
