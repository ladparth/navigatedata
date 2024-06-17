"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navItems } from "@/data/nav-items";
import { buttonVariants } from "./ui/button";

type NavLinkProps = {
  label: string;
  href: string;
  pathname: string;
};
function NavLink({ label, href, pathname }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-foreground/80",
        pathname?.startsWith(href) ? "text-foreground" : "text-foreground/60",
        buttonVariants({
          variant: "ghost",
        })
      )}
      aria-label={`Navigate to ${label}`}
    >
      {label}
    </Link>
  );
}

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link
        href="/"
        className="mr-6 flex items-center space-x-2"
        aria-label="NavigateData Home"
      >
        {/* <Icons.logo className="h-6 w-6" /> */}
        <span className="hidden font-medium text-lg sm:inline-block">
          NavigateData
        </span>
      </Link>
      <nav className="flex items-center text-sm">
        {navItems.mainNav &&
          navItems.mainNav.map((item: { title: string; href: string }) => (
            <NavLink
              key={item.title}
              label={item.title}
              href={item.href}
              pathname={pathname}
            />
          ))}
      </nav>
    </div>
  );
}
