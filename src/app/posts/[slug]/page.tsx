import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import React from "react";
import { PostHeader } from "@/components/post-header";
import { query } from "@/lib/graphql";
import { getPostBySlug, getPostMetadataBySlug } from "@/lib/hashnode/queries";
import { MarkdownToHtml } from "@/components/markdown-to-html";
import { notFound } from "next/navigation";
interface Post {
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
  };
  coverImage: {
    url: string;
  };
  publishedAt: string;
  slug: string;
  brief: string;
  comments: {
    totalDocuments: number;
  };
  views: number;
  readTimeInMinutes: number;
  content: {
    markdown: string;
    html: string;
  };
  tags: {
    name: string;
    postsCount: number;
  }[];
  reactionCount: number;
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

  const title = post.seo.title || post.title;
  const description = post.seo.description || post.brief;
  const url = post.canonicalUrl || post.url;

  return {
    title: title,
    description: description,
    image: post.coverImage.url,
    url: url,
  };
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

  const post: Post = publication?.post;
  if(!post){
    notFound();
  }
  return (
    <div className="relative flex flex-col">
      <SiteHeader nav />
      <main className="flex flex-col flex-1 p-6">
        <div className="w-full mr-auto ml-auto flex items-center justify-center flex-1 max-w-screen-2xl">
          <Card className="w-full md:w-3/4">
            <div className="p-0 flex flex-col gap-4 mt-12">
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
              />
              {/* <CustomMDX source={post.content.markdown} /> */}
              {/* <PostContent content={post.content.html} /> */}
              <MarkdownToHtml contentMarkdown={post.content.markdown} />
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
