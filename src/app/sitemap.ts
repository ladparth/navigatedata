import { getPosts } from "@/lib/hashnode/actions";

export default async function sitemap() {
  const posts = await getPosts();

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
