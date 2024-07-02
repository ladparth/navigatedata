import { MarkdownToHtml } from "@/components/markdown-to-html";
import { Card } from "@/components/ui/card";
import { query } from "@/lib/graphql";
import { getPageBySlug } from "@/lib/hashnode/queries";
import { Metadata } from "next/types";

export async function generateMetadata(): Promise<Metadata> {
  const {
    data: {
      publication: { staticPage },
    },
  } = await query({
    query: getPageBySlug,
    variables: {
      host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
      slug: "privacy-policy",
    },
    cache: "no-store",
  });
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/privacy-policy`;
  const metadata: Metadata = {
    title: "Privacy Policy",
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
      title: "Privacy Policy NavigateData",
    },
    openGraph: {
      title: "Privacy Policy NavigateData",
      description: staticPage.seo.description,
      siteName: "Privacy Policy NavigateData",
      url,
      images: [
        {
          url: staticPage.ogMetaData.image,
          alt: "Privacy Policy NavigateData",
        },
      ],
    },
  };

  return metadata;
}

export default async function page() {
  const {
    data: {
      publication: { staticPage },
    },
  } = await query({
    query: getPageBySlug,
    variables: {
      host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
      slug: "privacy-policy",
    },
    cache: "no-store",
  });

  return (
    <main className="flex flex-col flex-1 p-6">
      <div className="w-full mr-auto ml-auto flex items-center justify-center flex-1 max-w-screen-2xl">
        <Card className="w-full md:w-3/4 py-10">
          <MarkdownToHtml contentMarkdown={staticPage.content.markdown} />
        </Card>
      </div>
    </main>
  );
}
