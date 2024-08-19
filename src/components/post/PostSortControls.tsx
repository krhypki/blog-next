import Link from "next/link";
import { Button } from "../ui/button";

type PostSortControlsProps = {
  active: string;
};

const links = [
  { label: "Latest", name: "latest" },
  { label: "Most Popular", name: "popular" },
  { label: "Most Liked", name: "liked" },
];

export default function PostSortControls({ active }: PostSortControlsProps) {
  return (
    <div className="flex flex-col gap-6">
      {links.map((link) => (
        <Button
          variant={link.name === active ? "default" : "secondary"}
          asChild
          key={link.name}
        >
          <Link href={`?sort=${link.name}`}>{link.label}</Link>
        </Button>
      ))}
    </div>
  );
}
