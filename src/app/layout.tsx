import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import Subscribe from "@/components/subscribe";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: {
    template: "%s | NavigateData",
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
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed z-50 xl:bottom-10 xl:right-10 bottom-3 right-3">
            <Subscribe />
          </div>
          {children}
          <Analytics />
        </ThemeProvider>
        <Toaster richColors closeButton position="top-right" />
      </body>
    </html>
  );
}
