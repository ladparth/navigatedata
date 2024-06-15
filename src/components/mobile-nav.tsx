"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { navItems } from "@/data/nav-items";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Icons.toggleMenu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
          pathname={pathname}
        >
          <span className="font-medium text-lg">NavigateData</span>
        </MobileLink>
        <div className="flex flex-col pt-4 gap-2">
          {navItems.mainNav &&
            navItems.mainNav.map(
              (item: { title: string; href: string }) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                    pathname={pathname}
                  >
                    {item.title}
                  </MobileLink>
                )
            )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  pathname?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  pathname,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href.toString()}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(
        "transition-colors hover:text-foreground/80",
        pathname?.startsWith(href.toString())
          ? "text-foreground"
          : "text-foreground/60",
        buttonVariants({
          variant: "ghost",
        }),
        "justify-start"
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
