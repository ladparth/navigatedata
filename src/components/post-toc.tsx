import Link from "next/link";
import { Card, CardContent, CardTitle } from "./ui/card";

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
}: {
  data: TableOfContentsItem[];
  parentId: TableOfContentsItem["parentId"];
}) => {
  const children = data.filter((item) => item.parentId === parentId);
  if (children.length === 0) return null;
  return (
    <ul className="mt-5 flex flex-col gap-3 max-md:text-sm md:font-medium">
      {children.map((item) => (
        <li key={item.id}>
          <Link
            href={`#heading-${item.slug}`}
            className="hover:underline"
          >
            {item.title}
          </Link>

          <Toc data={data} parentId={item.id} />
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
          <CardTitle>Table of contents</CardTitle>
          <CardContent className="max-md:p-0 py-0">
            <Toc parentId={null} data={mapTableOfContentItems(items)} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};
