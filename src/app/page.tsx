import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
} from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Metadata } from "next/types";
import Link from "next/link";

export async function generateMetadata() {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/`;
  const metadata: Metadata = {
    title: "NavigateData",
    description: "Navigate the Data Landscape",
    category: "Data Engineering & Analytics",
    publisher: "NavigateData",
    alternates: {
      canonical: url,
    },
    twitter: {
      site: "@PSL4d",
      card: "summary_large_image",
      creator: "@PSL4d",
      images:
        "https://cdn.hashnode.com/res/hashnode/image/upload/v1702738883982/iAH7qOECO.png?w=800&h=420&fit=crop&crop=entropy&auto=compress,format&format=webp",
      title: "NavigateData",
    },
    openGraph: {
      title: "NavigateData",
      description: "Navigate the Data Landscape",
      siteName: "NavigateData",
      url,
      images: [
        {
          url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1702738883982/iAH7qOECO.png?w=800&h=420&fit=crop&crop=entropy&auto=compress,format&format=webp",
          alt: "NavigateData",
        },
      ],
    },
  };

  return metadata;
}
export default function Home() {
  return (
    <main className="flex-1 flex flex-col text-center justify-center items-center">
      <PageHeader>
        <h1 className="text-4xl font-bold sm:text-7xl">NavigateData</h1>
        <PageHeaderDescription>
          Navigate the Data Landscape
        </PageHeaderDescription>
        <section className="max-w-[600px] px-6">
          <p>
            Explore blogs on Data Analytics and Data Engineering for in-depth
            insights, practical tips, and the latest trends in the industry.
          </p>
        </section>
        <PageActions>
          <Link
            href="/blog"
            className={cn(buttonVariants())}
            aria-label="Start Reading"
          >
            Start Reading
          </Link>
        </PageActions>
      </PageHeader>
    </main>
  );
}
