import { AVATAR_PLACEHOLDER_PATH } from "@/lib/constants";
import { getImageUrl } from "@/lib/utils/stringUtils";
import Image, { ImageProps } from "next/image";

type AvatarProps = Omit<ImageProps, "src"> & {
  src: string | null;
};

export default function Avatar({ src, alt, ...props }: AvatarProps) {
  const placeholderPath = getImageUrl("avatars", AVATAR_PLACEHOLDER_PATH);
  const avatarPath = src ? getImageUrl("avatars", src) : placeholderPath;

  return (
    <Image
      src={avatarPath}
      width="32"
      height="32"
      alt={alt}
      className="w-[32px] h-[32px] rounded-full"
    />
  );
}
