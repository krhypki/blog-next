"use client";
import { useEffect, useState } from "react";
import CategorySelect from "./CategorySelect";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { createParamsStringFromArray } from "@/lib/utils/searchParams";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { Category } from "@/lib/types/database";

type PostFilterboxProps = {
  categories: Category[];
};

export default function PostFilterbox({ categories }: PostFilterboxProps) {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [published, setPublished] = useState(" ");

  useEffect(() => {
    const paramsArray: [string, string | undefined][] = [
      ["category", category],
      ["query", searchValue],
      ["published", published.toString().trim() || undefined],
    ];

    const paramStr = createParamsStringFromArray(paramsArray);

    router.replace(`/dashboard/posts${paramStr}`);
  }, [category, searchValue, published, router]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10 max-w-[900px]">
      <div className="flex flex-1 gap-x-2">
        <CategorySelect
          categories={categories}
          value={category}
          onChange={(value) => setCategory(value.name)}
        />
        <Button onClick={() => setCategory("")}>Clear</Button>
      </div>

      <Input
        placeholder="Search posts"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      <div className="flex items-center gap-x-2">
        <Label htmlFor="published">Published</Label>
        <Select
          name="published"
          value={published}
          onValueChange={(value) => setPublished(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Is published" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">All</SelectItem>
            <SelectItem value="true">Published only</SelectItem>
            <SelectItem value="false">Not published only</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
