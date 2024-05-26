import Link from "next/link";
import { Card, CardContent, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";

type TableOfContentsItem = {
  id: string;
  level: number;
  slug: string;
  title: string;
  parentId?: string | null;
};

const mapTableOfContentItems = (toc: TableOfContentsItem[]) => {
  try {
    return (toc ?? []).map((tocItem) => {
      const item = Array.isArray(tocItem) ? tocItem[0] : tocItem;
      return {
        id: item.id,
        level: item.level,
        slug: item.slug,
        title: item.title,
        parentId: item.parentId ?? null,
      };
    });
  } catch (error) {
    console.error("Error while mapping table of content items", {
      error,
    });
    return [];
  }
};

const Toc = ({
  data,
  parentId,
  child,
}: {
  data: TableOfContentsItem[];
  parentId: TableOfContentsItem["parentId"];
  child?: boolean;
}) => {
  const children = data.filter((item) => item.parentId === parentId);
  if (children.length === 0) return null;
  return (
    <ul className="flex flex-col max-md:text-sm text-lg">
      {children.map((item) => (
        <li
          key={item.id}
        >
          <Link
            href={`#heading-${item.slug}`}
            className={cn(
              "flex items-center gap-x-2 rounded-lg px-2 focus:outline-none hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-slate-800 dark:focus:bg-slate-800 py-2 ",
              child && "max-md:text-xs text-sm pl-4"
            )}
          >
            {child && <span>-</span>}
            <span>{item.title}</span>
          </Link>

          <Toc data={data} parentId={item.id} child />
        </li>
      ))}
    </ul>
  );
};

export const PostTOC = ({ items }: { items: TableOfContentsItem[] }) => {
  return (
    <>
      <div className="w-full px-5">
        <Card className="mx-auto w-full max-w-screen-md rounded-lg p-5 text-base leading-snug">
          <CardTitle className="text-2xl">Table of contents</CardTitle>
          <CardContent className="p-0 mt-3">
            <Toc parentId={null} data={mapTableOfContentItems(items)} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};
