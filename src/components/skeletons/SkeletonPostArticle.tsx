import { Card, CardContent } from "../ui/card";
import Skeleton from "./Skeleton";
import SkeletonPostMeta from "./SkeletonPostMeta";

export default function SkeletonPostArticle() {
  return (
    <Card className="max-w-[640px] mx-auto">
      <CardContent>
        <article>
          <Skeleton className="w-full h-[300px]" />
          <div className="px-4 py-4 space-y-8">
            <SkeletonPostMeta />
            <Skeleton className="w-full h-[40px]" />
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="w-[48px] h-4 mb-2" />
              ))}
            </div>

            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="w-full h-[20px]" />
              ))}
            </div>
          </div>
        </article>
      </CardContent>
    </Card>
  );
}
