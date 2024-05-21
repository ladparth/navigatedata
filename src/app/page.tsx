import BlogCard from "@/components/blog-card";
import { SiteHeader } from "@/components/site-header";
import { query } from "@/lib/graphql";
import { getPostsByPublication } from "@/lib/hashnode/queries";

import Link from "next/link";

interface Post {
  title: string;
  author: {
    name: string;
    profilePicture: string;
  };
  tags: {
    name: string;
  }[];
  publishedAt: string;
  slug: string;
  brief: string;
  coverImage: {
    url: string;
  };
}

export default async function Home() {
  const {
    data: { publication },
  } = await query({
    query: getPostsByPublication,
    variables: { host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST },
  });
  const posts: Array<Post> = publication.posts.edges.map(
    ({ node }: { node: Post }) => node
  );

  return (
    <div className="relative flex flex-col">
      <SiteHeader nav />
      <main className="flex flex-col flex-1 p-6">
        <div className="container flex-1 flex flex-col items-center space-y-4 max-w-screen-2xl">
          {posts.map((post: any) => (
            <Link
              href={`/posts/${post.slug}`}
              key={post.slug}
              className="w-full md:w-2/3"
            >
              <BlogCard
                imageUrl={post.coverImage.url}
                category={post.tags[0].name}
                title={post.title}
                description={post.brief}
                author={post.author.name}
                authorImage={post.author.profilePicture}
                authorTitle="Data Engineer"
                time={post.publishedAt}
              />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
