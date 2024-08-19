import { cn } from "@/lib/utils/cn";
import { cva } from "class-variance-authority";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingProps = {
  tag: HeadingTag;
  variant?: HeadingTag;
  children: React.ReactNode;
  className?: string;
};

export default function Heading({
  tag,
  variant,
  children,
  className,
}: HeadingProps) {
  const Tag = tag;
  const styleTag = variant ?? tag;

  const headingClassName = cva(`font-semibold mb-4 lg:mb-8`, {
    variants: {
      styleTag: {
        h1: "text-2xl lg:text-4xl",
        h2: "text-xl lg:text-3xl",
        h3: "text-lg lg:text-2xl",
        h4: "text-base lg:text-xl",
        h5: "text-base lg:text-lg",
        h6: "text-base",
      },
    },
    defaultVariants: {
      styleTag: "h1",
    },
  });

  return (
    <Tag
      className={cn(headingClassName({ styleTag }), "capitalize", className)}
    >
      {children}
    </Tag>
  );
}
