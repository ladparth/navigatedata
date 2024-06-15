import React from "react";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function BlogCardSkeleton() {
  return (
    <Card className="w-full h-full p-0 xl:flex">
      <div className="flex-1 px-4 pt-4 md:py-6 justify-center">
        <Skeleton className="w-full h-32 md:h-52" />
      </div>
      <div className="xl:flex-1 flex gap-4 p-4 md:gap-8 md:p-6 items-center">
        <div className="w-full h-full flex flex-col space-y-4">
          <div className="w-full flex flex-wrap justify-between">
            <Skeleton className="w-24 h-5" />
            <Skeleton className="w-24 h-5" />
          </div>
          <Skeleton className="w-full h-7 md:h-10" />
          <Skeleton className="w-full h-20 md:h-full" />
        </div>
      </div>
    </Card>
  );
}
