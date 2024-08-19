import { Category } from "@/lib/types/database";
import CategoryItem from "./CategoryItem";

type CategoryListProps = {
  active: string | undefined;
  categories: Category[];
  baseUrl: string;
};

export default function CategoryList({
  categories,
  active,
  baseUrl,
}: CategoryListProps) {
  return (
    <div className="flex flex-col gap-y-6">
      <CategoryItem category="all" url={baseUrl} isActive={!active} />
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          url={`${baseUrl}?category=${category.name}`}
          category={category.name}
          isActive={category.name === active}
        />
      ))}
    </div>
  );
}
