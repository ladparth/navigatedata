"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export enum SortOrder {
  Asc = "Asc",
  Desc = "Desc",
}

export default function Sort() {
  const [sortOrder, setSortOrder] = useState(SortOrder.Desc);
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleSort() {
    const newSortOrder =
      sortOrder === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc;
    setSortOrder(newSortOrder);

    const params = new URLSearchParams(searchParams);
    if (newSortOrder === SortOrder.Asc) {
      params.set("sort", newSortOrder);
    } else {
      params.delete("sort");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="rounded-lg p-2"
            onClick={handleSort}
          >
            {sortOrder === SortOrder.Asc ? (
              <ArrowUpWideNarrow className="h-5 w-5" />
            ) : (
              <ArrowDownWideNarrow className="h-5 w-5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {sortOrder === "Asc"
              ? "Sorting: Oldest First"
              : "Sorting: Newest First"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
