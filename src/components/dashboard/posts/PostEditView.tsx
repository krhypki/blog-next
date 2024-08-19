"use client";

import NewPostForm from "./NewPostForm";
import Heading from "@/components/general/Heading";
import NewPostPreview from "./NewPostPreview";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type PostEditViewProps = {
  isPublished?: boolean;
};

export default function PostEditView({
  isPublished = false,
}: PostEditViewProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-20"
      data-color-mode="light"
    >
      <div className="max-lg:order-1">
        <NewPostForm isPublished={isPublished} />
      </div>

      <Button
        variant="secondary"
        className="lg:hidden mr-auto"
        onClick={() => setShowPreview(!showPreview)}
      >
        {showPreview ? "Hide" : "Show"} Preview
      </Button>
      <div className={`flex flex-col ${!showPreview && "max-lg:hidden"}`}>
        <Heading tag="h2" variant="h4">
          Preview:
        </Heading>
        <NewPostPreview />
      </div>
    </div>
  );
}
