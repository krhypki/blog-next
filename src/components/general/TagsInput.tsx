"use client";

import { KeyboardEvent, useState } from "react";
import { Input } from "../ui/input";
import Tag from "./Tag";
import { FormMessage } from "../ui/form";

type TagsInputProps = {
  limit?: number;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
};

export default function TagsInput({
  tags,
  limit = 5,
  onTagsChange,
}: TagsInputProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const addNewTag = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    const isValid = checkTagsValidity(value);
    if (!isValid) {
      return;
    }

    onTagsChange([...tags, value.trim()]);
    setValue("");
    setError("");
  };

  const checkTagsValidity = (value: string) => {
    if (tags.length >= limit) {
      setError(`You can only add ${limit} tags`);
      return false;
    }

    if (tags.includes(value.trim())) {
      setError("Tag already exists");
      return false;
    }

    return true;
  };

  const removeTag = (tag: string) => {
    setError("");
    onTagsChange(tags.filter((el) => el !== tag));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6">
        {tags.map((tag) => (
          <Tag key={tag} onClick={() => removeTag(tag)}>
            {tag}
          </Tag>
        ))}
      </div>
      <Input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyDownCapture={addNewTag}
        className="mb-2"
        placeholder="Type new tag and press Enter"
      />
      <FormMessage>{error}</FormMessage>
    </div>
  );
}
