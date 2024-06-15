import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import Subscribe from "@/components/subscribe";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: {
    template: "NavigateData | %s",
    default: "NavigateData",
  },
  description:
    "Unlock data's power with NavigateData! Explore expert insights, tools, and tailored solutions in Power BI, Python, Spark, SQL, and more. Elevate your data journey!  ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader nav />
          {children}
          <SiteFooter />
          <Analytics />
        </ThemeProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
