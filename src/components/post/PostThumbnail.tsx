import { Post } from "@/lib/types/database";
import Image, { ImageProps } from "next/image";

type PostThumbnailProps = Omit<ImageProps, "src"> & {
  src?: Post["thumbnail"];
};

export default function PostThumbnail({
  alt,
  src,
  ...props
}: PostThumbnailProps) {
  if (!src) {
    return <div className="w-full h-full bg-gray-200" />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      {...props}
      fill
      className="object-contain"
      sizes="(max-width: 992px) 50vw, 33vw"
    />
  );
}
