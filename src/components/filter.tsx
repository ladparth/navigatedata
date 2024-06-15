"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eraser, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export type Item = {
  name: string;
  posts: number;
};

export function BlogFilter({ items, title }: { items: Item[]; title: string }) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClear = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("filter");

    replace(`${pathname}?${params.toString()}`);
  };
  const handleCheckedChanged = (name: string, checked: Checked) => {
    const params = new URLSearchParams(searchParams);
    const filters = searchParams.get("filter")?.split(",") || [];

    if (checked) {
      filters.push(name);
    } else {
      const index = filters.indexOf(name);
      filters.splice(index, 1);
    }

    if (filters.length) {
      params.set("filter", filters.join(","));
    } else {
      params.delete("filter");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger
              className={cn(buttonVariants({ variant: "outline" }), "px-2")}
            >
              <Filter className="h-5 w-5" />
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>{title}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>{title}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-lg"
                  onClick={handleClear}
                >
                  <Eraser className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear Filters</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-60">
          {items.map((item, index) => (
            <DropdownMenuCheckboxItem
              key={index}
              checked={searchParams.get("filter")?.includes(item.name)}
              onCheckedChange={(checked) =>
                handleCheckedChanged(item.name, checked)
              }
            >
              {item.name} ({item.posts})
            </DropdownMenuCheckboxItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
