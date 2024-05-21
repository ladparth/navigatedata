import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { MobileNav } from "./mobile-nav";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function SiteHeader({ nav }: { nav?: boolean }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        nav &&
          "border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        {nav ? (
          <>
            <MainNav />
            <MobileNav />
          </>
        ) : (
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/* <Icons.logo className="h-6 w-6" /> */}
            <span className="hidden font-bold sm:inline-block">
              NextStarter
            </span>
          </Link>
        )}
        <div className="flex items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
