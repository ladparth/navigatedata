"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navItems } from "@/data/nav-items";

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
        pathname?.startsWith(href) ? "text-foreground" : "text-foreground/60"
      )}
    >
      {label}
    </Link>
  );
}

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        {/* <Icons.logo className="h-6 w-6" /> */}
        <span className="hidden font-medium text-lg sm:inline-block">NavigateData</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
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
