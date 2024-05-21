"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function UnderConstruction() {
  const router = useRouter();
  return (
    <div className="mb-16 flex flex-col items-center justify-center text-center space-y-4">
      <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[5rem] font-extrabold leading-none text-transparent">
        Building
      </span>
      <p>Sorry, the page you are looking for is under construction.</p>
      <div className="mt-8 flex justify-center gap-2">
        <Button onClick={() => router.back()} variant="default" size="lg">
          Go back
        </Button>
        <Button onClick={() => router.push("/")} variant="ghost" size="lg">
          Back to Home
        </Button>
      </div>
    </div>
  );
}
