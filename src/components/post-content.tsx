import markdownStyles from "./markdown-styles.module.css";
import { getSanitizedHTML } from "@/lib/utils";
type Props = {
  content: string;
};

export function PostContent({ content }: Props) {
  const sanitizedContent = getSanitizedHTML(content);
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </div>
  );
}
