import { User } from "@/lib/types/database";
import Avatar from "../general/Avatar";

type PostMetadataProps = {
  author: string;
  avatar: User["avatar"];
  date: string;
};

export default function PostMetadata({
  author,
  date,
  avatar,
}: PostMetadataProps) {
  return (
    <div className="flex gap-x-2 items-center py-6">
      <Avatar src={avatar} alt={author} />
      <div className="flex flex-col">
        <span className="text-sm">{author}</span>
        <time className="text-xs">{date}</time>
      </div>
    </div>
  );
}
