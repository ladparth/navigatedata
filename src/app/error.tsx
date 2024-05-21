"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    toast.error(error.message);
  }, [error]);

  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mb-16 items-center justify-center text-center">
        <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
          500
        </span>
        <h2 className="my-2 font-heading text-2xl font-bold">
          Something went wrong
        </h2>
        <p>Sorry, something went wrong. Please try again later.</p>
        <div className="mt-8 flex justify-center gap-2">
          <Button onClick={() => reset()} variant="default" size="lg">
            Try again
          </Button>
        </div>
      </div>
    </>
  );
}
