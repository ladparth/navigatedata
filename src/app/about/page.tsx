import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { query } from "@/lib/graphql";
import { getPageBySlug } from "@/lib/hashnode/queries";
import { cn } from "@/lib/utils";
import { Metadata } from "next/types";
import Link from "next/link";
import React from "react";
import AnimatedText from "@/components/animated-text";

export async function generateMetadata(): Promise<Metadata> {
  const {
    data: {
      publication: { staticPage },
    },
  } = await query({
    query: getPageBySlug,
    variables: {
      host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
      slug: "about",
    },
    cache: "no-store",
  });
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/about`;
  const metadata: Metadata = {
    title: "About",
    description: staticPage.seo.description,
    alternates: {
      canonical: url,
    },
    category: "Data Engineering & Analytics",
    publisher: "NavigateData",
    twitter: {
      site: "@PSL4d",
      card: "summary_large_image",
      creator: "@PSL4d",
      images: staticPage.ogMetaData.image,
      title: "About NavigateData",
    },
    openGraph: {
      title: "About NavigateData",
      description: staticPage.seo.description,
      siteName: "About NavigateData",
      url,
      images: [
        {
          url: staticPage.ogMetaData.image,
          alt: "About NavigateData",
        },
      ],
    },
  };

  return metadata;
}

export default function page() {
  return (
    <>
      <main className="flex-1 flex flex-col justify-center items-center px-6">
        <PageHeader>
          <PageHeaderHeading>About Me</PageHeaderHeading>
          <PageHeaderDescription className="max-w-[950px]">
            Hey there! Welcome to <AnimatedText>NavigateData</AnimatedText>.
            <br />
            <br />
            I&apos;m <AnimatedText>Parth Lad</AnimatedText>, a data analyst with
            4+ years of experience in{" "}
            <AnimatedText>Data Analytics and Engineering</AnimatedText> using
            Microsoft Fabric and Power BI. I created this site to share my
            knowledge with fellow data enthusiasts.
            <br /> <br /> If you need any help with data-related inquiries or
            have questions, feel free to reach out, and don&apos;t forget to{" "}
            <AnimatedText>subscribe to my newsletter</AnimatedText> for the
            latest blog updates — no spam, I promise!
            <br />
            <br />
            <Link
              href="mailto:connect@thenavigatedata.com"
              className={cn(
                buttonVariants({
                  variant: "default",
                })
              )}
              aria-label="Connect with me"
            >
              Connect with me
            </Link>
          </PageHeaderDescription>
        </PageHeader>
      </main>
    </>
  );
}
