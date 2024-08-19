import SkeletonAvatar from "./SkeletonAvatar";
import Skeleton from "./Skeleton";

export default function SkeletonPostMeta() {
  return (
    <div className="flex items-center gap-x-2 mb-10">
      <SkeletonAvatar />
      <div className="space-y-1">
        <Skeleton className="w-[80px] h-3" />
        <Skeleton className="w-[30px] h-2" />
      </div>
    </div>
  );
}
