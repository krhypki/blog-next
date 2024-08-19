import { ImageUploadVariant } from "@/lib/types/image";
import Image from "next/image";

type ImageUploaderPreviewProps = {
  imageSrc: string;
  imageAlt: string;
  variant: ImageUploadVariant;
};

export default function ImageUploaderPreview({
  imageSrc,
  imageAlt,
  variant,
}: ImageUploaderPreviewProps) {
  return (
    <div className="flex items-center justify-center gap-x-6">
      {variant === "avatar" && (
        <Image
          src={imageSrc}
          width="64"
          height="64"
          alt={imageAlt}
          className="w-[64px] h-[64px] rounded-full"
        />
      )}

      {variant === "image" && imageSrc && (
        <Image
          src={imageSrc}
          width="300"
          height="200"
          alt={imageAlt}
          className="w-[300px] h-[200px]"
        />
      )}
    </div>
  );
}
