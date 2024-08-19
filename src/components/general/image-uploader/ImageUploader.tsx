"use client";

import { cn } from "@/lib/utils/cn";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import ImageUploaderPreview from "./ImageUploaderPreview";
import { imageSchema } from "@/lib/zod/general";
import { ImageUploadVariant } from "@/lib/types/image";

interface ImageUploaderProps {
  imageAlt: string;
  initialImage?: string | null;
  className?: string;
  variant?: ImageUploadVariant;
  onImageChange?: (image: File) => void;
}

export const ImageUploader = ({
  imageAlt,
  initialImage,
  className,
  onImageChange,
  variant = "image",
}: ImageUploaderProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(initialImage || "");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropRef = useRef(null);

  const preventDefaults = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    preventDefaults(e);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      e.dataTransfer.clearData();

      createPreviewImg(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      const validatedImage = imageSchema.safeParse({
        image: event.currentTarget.files[0],
      });

      if (!validatedImage.success) {
        toast.error(validatedImage.error.errors[0].message);
        return;
      }

      const file = event.currentTarget.files[0];

      if (onImageChange) {
        onImageChange(file);
      }

      createPreviewImg(file);
    }
  };

  const createPreviewImg = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const target = e.target;
      setImageSrc(target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-y-10 max-w-full w-[400px] px-4",
        className
      )}
    >
      {imageSrc && (
        <ImageUploaderPreview
          variant={variant}
          imageSrc={imageSrc}
          imageAlt={imageAlt ?? ""}
        />
      )}

      <div
        className="border border-dotted border-slate-900 mx-auto bg-slate-200 relative cursor-pointer w-full h-[200px] flex flex-col items-center justify-center rounded-md hover:opacity-70 transition-all"
        ref={dropRef}
        onDrag={preventDefaults}
        onDragStart={preventDefaults}
        onDragEnd={preventDefaults}
        onDragOver={preventDefaults}
        onDrop={handleDrop}
      >
        <Button className="mb-4">Browse image</Button>
        <span className="text-slate-900">or drop it here</span>
        <input
          type="file"
          name="image"
          ref={fileInputRef}
          onChange={handleChange}
          className="absolute w-full h-full z-10 opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
};
