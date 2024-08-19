import SkeletonPost from "./SkeletonPost";

export default function SkeletonPostList() {
  return (
    <div className="space-y-20">
      {Array.from({ length: 5 }).map((_, i) => (
        <SkeletonPost key={i} />
      ))}
    </div>
  );
}
