// "use client";
// import { useEmbeds } from "@/lib/renderer/hooks/useEmbeds";
import { markdownToHtml } from "@/lib/renderer/markdownToHtml";
import { memo } from "react";
import { cn } from "@/lib/utils";
type Props = {
  contentMarkdown: string;
};

const _MarkdownToHtml = ({ contentMarkdown }: Props) => {
  const content = markdownToHtml(contentMarkdown);
  // useEmbeds({ enabled: true });

  return (
    <div
      className={cn(
        "mx-auto w-full px-5 md:max-w-screen-md",
        "prose dark:prose-invert prose-pre:border prose-img:rounded-lg prose-img:shadow-lg lg:prose-xl [&>iframe]:w-full [&>iframe]:aspect-video"
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export const MarkdownToHtml = memo(_MarkdownToHtml);
