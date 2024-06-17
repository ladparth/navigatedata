"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      size="icon"
      variant="ghost"
      className="rounded-full"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label={
        theme === "light" ? "Activate dark mode" : "Activate light mode"
      }
      title={theme === "light" ? "Activate dark mode" : "Activate light mode"}
    >
      <span className="sr-only">
        {theme === "light" ? "Activate dark mode" : "Activate light mode"}
      </span>
      {theme === "light" ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </Button>
  );
}
