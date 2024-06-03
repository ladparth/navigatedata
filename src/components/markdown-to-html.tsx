// "use client";
// import { useEmbeds } from "@/lib/renderer/hooks/useEmbeds";
import { markdownToHtml } from "@/lib/renderer/markdownToHtml";
import { memo } from "react";
import { cn } from "@/lib/utils";
type Props = {
  contentMarkdown: string;
  className?: string;
};

const _MarkdownToHtml = ({ contentMarkdown, className }: Props) => {
  const content = markdownToHtml(contentMarkdown);
  // useEmbeds({ enabled: true });
  const highlightJsMonokaiTheme =
    ".hljs{display:block;overflow-x:auto;padding:.5em;background:#23241f}.hljs,.hljs-subst,.hljs-tag{color:#f8f8f2}.hljs-emphasis,.hljs-strong{color:#a8a8a2}.hljs-bullet,.hljs-link,.hljs-literal,.hljs-number,.hljs-quote,.hljs-regexp{color:#ae81ff}.hljs-code,.hljs-section,.hljs-selector-class,.hljs-title{color:#a6e22e}.hljs-strong{font-weight:700}.hljs-emphasis{font-style:italic}.hljs-attr,.hljs-keyword,.hljs-name,.hljs-selector-tag{color:#f92672}.hljs-attribute,.hljs-symbol{color:#66d9ef}.hljs-class .hljs-title,.hljs-params{color:#f8f8f2}.hljs-addition,.hljs-built_in,.hljs-builtin-name,.hljs-selector-attr,.hljs-selector-id,.hljs-selector-pseudo,.hljs-string,.hljs-template-variable,.hljs-type,.hljs-variable{color:#e6db74}.hljs-comment,.hljs-deletion,.hljs-meta{color:#75715e}";

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: highlightJsMonokaiTheme,
        }}
      />
      <div
        className={cn(
          "mx-auto w-full px-5 md:max-w-screen-md",
          "prose dark:prose-invert prose-pre:border prose-img:rounded-lg prose-img:shadow-lg lg:prose-xl [&>iframe]:w-full [&>iframe]:aspect-video",
          className
        )}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  );
};

export const MarkdownToHtml = memo(_MarkdownToHtml);
