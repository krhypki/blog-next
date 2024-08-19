import { Card, CardContent } from "../ui/card";
import Skeleton from "./Skeleton";
import SkeletonPostMeta from "./SkeletonPostMeta";

export default function SkeletonPost() {
  return (
    <Card>
      <Skeleton className="w-full h-[160px] mb-6" />
      <CardContent>
        <SkeletonPostMeta />
        <Skeleton className="w-[200px] h-6 mb-10" />
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-4 mb-2" />
        ))}
      </CardContent>
    </Card>
  );
}
