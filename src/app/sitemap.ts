import { Post } from "@/app/blog/[slug]/page";
import { query } from "@/lib/graphql";
import { getPostsByPublication } from "@/lib/hashnode/queries";

export default async function sitemap() {
  const {
    data: { publication },
  } = await query({
    query: getPostsByPublication,
    variables: {
      host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
    },
  });

  const posts: Post[] = publication?.posts?.edges.map(
    ({ node }: { node: Post }) => node
  );

  const blogs = posts.map((post) => ({
    url: `${process.env.BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt).toISOString(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const routes = ["", "/about", "/blog"].map((route) => ({
    url: `${process.env.BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "always",
    priority: 1,
  }));

  return [...routes, ...blogs];
}
