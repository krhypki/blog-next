"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useNewPostContext } from "@/hooks/contexts";
import MarkdownPreview from "@uiw/react-markdown-preview";

export default function NewPostPreview() {
  const { formValues: values } = useNewPostContext();

  const thumbnailMd = values.thumbnail ? `![image](${values.thumbnail})` : "";

  const content = `
  # ${values.title}
  ${thumbnailMd}
  ### ${values.intro}
  ${values.content}
`.trim();

  return (
    <Card className="h-full">
      <CardContent>
        <MarkdownPreview source={content} />
      </CardContent>
    </Card>
  );
}
