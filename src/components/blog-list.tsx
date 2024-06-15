import Link from "next/link";
import BlogCard from "./blog-card";
export interface Post {
  title: string;
  publishedAt: string;
  slug: string;
  brief: string;
  coverImage: {
    url: string;
  };
  content: {
    markdown: string;
  };
  series: {
    name: string;
  };
}
export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

export default function BlogList({
  initialPosts,
  initialPageInfo,
  query,
  sort,
  filter,
}: {
  initialPosts: Post[];
  initialPageInfo: PageInfo;
  query?: string;
  sort?: string;
  filter?: string;
}) {
  const posts = initialPosts
    .filter((post) => {
      const matchesQuery = query
        ? post.content.markdown.toLowerCase().includes(query.toLowerCase()) ||
          post.title.toLowerCase().includes(query.toLowerCase())
        : true;

      const matchesFilter = filter ? filter.includes(post.series?.name) : true;

      return matchesQuery && matchesFilter;
    })
    .sort((a, b) => {
      if (sort === "Asc") {
        return (
          new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        );
      } else {
        return (
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
      }
    });

  return (
    <>
      {posts.map((post: any) => (
        <Link
          href={`/blog/${post.slug}`}
          key={post.slug}
          className="w-full md:w-2/3"
        >
          <BlogCard
            imageUrl={post.coverImage.url}
            series={post.series?.name}
            title={post.title}
            description={post.brief}
            time={post.publishedAt}
          />
        </Link>
      ))}
    </>
  );
}
