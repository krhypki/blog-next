type TagListProps = {
  tags: string[];
};

export default function TagList({ tags }: TagListProps) {
  return (
    <div className="space-x-4 mb-4">
      {tags.map((tag) => (
        <span key={tag} className="font-semibold">
          #{tag}
        </span>
      ))}
    </div>
  );
}
