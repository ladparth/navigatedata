import { Card } from "@/components/ui/card";
import React from "react";
import { PostHeader } from "@/components/post-header";
import { query } from "@/lib/graphql";
import { getDraftById } from "@/lib/hashnode/queries";
import { MarkdownToHtml } from "@/components/markdown-to-html";
import { notFound } from "next/navigation";
import { PostTOC } from "@/components/post-toc";
import { addArticleJsonLd } from "@/lib/seo/addArticleJsonLd";
import { Metadata } from "next/types";
import { SocialShare } from "@/components/social-share";
import AuthorBio from "@/components/author-bio";
import TOC from "@/components/toc-popover";
import { fetchPublication } from "@/lib/hashnode/actions";

export const revalidate = 3600;

export interface DraftPost {
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
  slug: string;
  readTimeInMinutes: number;
  content: {
    markdown: string;
  };
  tagsV2: {
    __typename: string;
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
    id: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const { id } = params;

  const {
    data: { draft },
  } = await query({
    query: getDraftById,
    variables: {
      host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
      id,
    },
  });

  const post: DraftPost = draft;
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
    // keywords: post?.tags?.map((tag) => tag.name),
    publisher: "NavigateData",
    category: "Data Engineering & Analytics",
    openGraph: {
      title,
      description,
      images,
      type: "article",
      siteName: "NavigateData",
      url,
      // tags: post?.tags?.map((tag) => tag.name),
      authors: [post?.author?.username],
      section: "Technology",
    },
    twitter: {
      card: "summary_large_image",
      site: "@PSL4d",
      creator: "@PSL4d",
      title: title,
      description: description,
      images: post.coverImage?.url,
    },
  };

  return metadata;
}

export default async function page({ params }: Props) {
  const { id } = params;
  const publication = await fetchPublication(1);

  const {
    data: { draft },
  } = await query({
    query: getDraftById,
    variables: {
      host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
      id,
    },
  });

  const post: DraftPost = draft;
  if (!post) {
    notFound();
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(addArticleJsonLd(publication, post)),
        }}
      />
      <div className="relative flex flex-col">
        <main className="flex flex-col flex-1 p-6">
          <div className="w-full mr-auto ml-auto flex items-center justify-center flex-1 max-w-screen-2xl">
            <Card className="w-full md:w-3/4">
              <div className="p-0 flex flex-col gap-4 mt-12">
                <PostHeader
                  title={post.title}
                  coverImage={post.coverImage?.url}
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
                  <div className="px-5">
                    <PostTOC items={post.features.tableOfContents.items} />
                  </div>
                )}
                <MarkdownToHtml contentMarkdown={post.content.markdown} />
                <div className="flex flex-col gap-2 fixed z-50 xl:bottom-[5.5rem] xl:right-10 bottom-14 right-3">
                  <TOC items={post.features.tableOfContents.items} />
                  <SocialShare title={post.title} slug={post.slug} />
                </div>
              </div>
              <div className="py-4 mx-auto w-full px-6 md:max-w-screen-md">
                <AuthorBio author={post.author} />
              </div>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
