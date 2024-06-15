import { List } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { PostTOC, TableOfContentsItem } from "./post-toc";

export default function TOC({ items }: { items: TableOfContentsItem[] }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="rounded-lg flex gap-2 items-center py-5"
        >
          <List />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 w-80 md:w-[28rem] mr-3 xl:mr-10 shadow-md"
        side="top"
      >
        <PostTOC items={items} className="border-none" />
      </PopoverContent>
    </Popover>
  );
}
