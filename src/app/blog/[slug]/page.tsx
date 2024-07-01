import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { PostHeader } from "@/components/post-header";
import { query } from "@/lib/graphql";
import { getPostBySlug, getPostMetadataBySlug } from "@/lib/hashnode/queries";
import { MarkdownToHtml } from "@/components/markdown-to-html";
import { notFound } from "next/navigation";
import { PostTOC } from "@/components/post-toc";
import { addArticleJsonLd } from "@/lib/seo/addArticleJsonLd";
import { Metadata } from "next/types";
import { SocialShare } from "@/components/social-share";
import AuthorBio from "@/components/author-bio";
import TOC from "@/components/toc-popover";
import { getPosts, getSeries } from "@/lib/hashnode/actions";
import AdUnit from "@/components/ad-unit";
import { cn } from "@/lib/utils";
import BlogList from "@/components/blog-list";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export const dynamicParams = true;
export const revalidate = 3600;

export interface Post {
  [x: string]: any;
  id: string;
  title: string;
  subtitle: string;
  seo: {
    title: string;
    description: string;
  };
  publication: {
    id: string;
  };
  url: string;
  canonicalUrl: string;
  author: {
    name: string;
    profilePicture: string;
    username: string;
    bio: {
      markdown: string;
    };
  };
  coverImage: {
    url: string;
  };
  publishedAt: string;
  updatedAt: string;
  slug: string;
  brief: string;
  comments: {
    totalDocuments: number;
  };
  readTimeInMinutes: number;
  content: {
    markdown: string;
    html: string;
  };
  series: {
    name: string;
  };
  tags: {
    name: string;
    postsCount: number;
  }[];
  features: {
    tableOfContents: {
      isEnabled: boolean;
      items: {
        id: string;
        level: number;
        slug: string;
        title: string;
        parentId: string;
      }[];
    };
  };
}

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const { slug } = params;

  const {
    data: { publication },
  } = await query({
    query: getPostMetadataBySlug,
    variables: {
      host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
      slug,
    },
  });

  const post: Post = publication?.post;
  if (!post) {
    notFound();
  }
  const title = post?.seo?.title || post.title;
  const description =
    post?.seo?.description || post?.brief || post?.subtitle || post?.title;
  const images = post?.coverImage?.url;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}`;

  const metadata: Metadata = {
    title,
    description,
    alternates: {
      canonical: url,
    },
    authors: [{ name: post?.author?.username }],
    keywords: post?.tags?.map((tag) => tag.name),
    publisher: "NavigateData",
    category: "Data Engineering & Analytics",
    openGraph: {
      title,
      description,
      images,
      type: "article",
      siteName: "NavigateData",
      url,
      tags: post?.tags?.map((tag) => tag.name),
      authors: [post?.author?.username],
      section: "Technology",
    },
    twitter: {
      card: "summary_large_image",
      site: "@PSL4d",
      creator: "@PSL4d",
      title: title,
      description: description,
      images: post.coverImage.url,
    },
  };

  return metadata;
}

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
}

export default async function page({ params }: Props) {
  const { slug } = params;

  const {
    data: { publication },
  } = await query({
    query: getPostBySlug,
    variables: {
      host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
      slug,
    },
  });

  const posts = await getPosts();

  const post: Post = publication?.post;
  if (!post) {
    notFound();
  }
  const filteredPosts = posts
    .filter((post) => {
      return post.series?.name === publication?.post?.series?.name;
    })
    .slice(0, 5);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(addArticleJsonLd(publication, post)),
        }}
      />
      <div className="relative flex flex-col">
        <main className="flex flex-col p-4">
          <div className="w-full mx-auto flex max-sm:flex-col gap-6 max-w-screen-2xl pt-6 px-2">
            <div className="w-full md:w-3/4 space-y-6">
              <div className="w-full space-y-4">
                <PostHeader
                  title={post.title}
                  coverImage={post.coverImage.url}
                  date={post.publishedAt}
                  author={{
                    username: post.author.username,
                    name: post.author.name,
                    profilePicture: post.author.profilePicture,
                  }}
                  readTimeInMinutes={post.readTimeInMinutes}
                  tags={post.tags}
                />
                {post.features.tableOfContents.isEnabled && (
                  <div className="md:px-5">
                    <PostTOC items={post.features.tableOfContents.items} />
                  </div>
                )}
                <InArticleAd />
                <MarkdownToHtml contentMarkdown={post.content.markdown} />
                <InArticleAd />
                <div className="flex flex-col gap-2 fixed z-50 xl:bottom-[5.5rem] xl:right-10 bottom-14 right-3">
                  <TOC items={post.features.tableOfContents.items} />
                  <SocialShare title={post.title} slug={post.slug} />
                </div>
              </div>
              <div className="w-full">
                <AuthorBio author={post.author} />
              </div>
              <InArticleAd />
            </div>
            <div className="w-full md:w-1/4 md:px-4 space-y-4">
              <h2 className="font-semibold text-xl">More Posts</h2>
              <Separator />
              {filteredPosts.map((post, index) => (
                <div key={post.slug} className="space-y-2">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="w-full space-y-2">
                      <Image
                        src={post.coverImage.url}
                        width={1600}
                        height={880}
                        alt="hero"
                        className="rounded-lg"
                      />
                      <h2 className="font-semibold">{post.title}</h2>
                    </div>
                  </Link>
                  <Separator />
                  {(index + 1) % 2 === 0 && (
                    <DisplayAdUnit
                      className="w-full mx-auto p-4 rounded-lg shadow-md"
                      format="rectangle"
                    />
                  )}
                </div>
              ))}
              <DisplayAdUnit
                className="w-full mx-auto p-4 rounded-lg shadow-md"
                format="auto"
              />

              {Array.from({ length: 5 }).map((_, index) => (
                <DisplayAdUnit
                  key={index}
                  className="w-full mx-auto p-4 rounded-lg shadow-md"
                  format="auto"
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

function DisplayAdUnit({
  className,
  format,
}: {
  className?: string;
  format?: string;
}) {
  return (
    <div className={className}>
      <AdUnit>
        <ins
          className="adsbygoogle"
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUB_ID!}
          style={{ display: "block" }}
          data-ad-slot="6759868245"
          data-ad-format={format}
          data-full-width-responsive="true"
        ></ins>
      </AdUnit>
    </div>
  );
}

function InArticleAd({ className }: { className?: string }) {
  return (
    <div className={className}>
      <AdUnit>
        <ins
          className="adsbygoogle"
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUB_ID!}
          style={{ display: "block", textAlign: "center" }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-slot="8920257026"
        ></ins>
      </AdUnit>
    </div>
  );
}
