import Link from "next/link";
import BlogCard from "./blog-card";

export interface Post {
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
  content: {
    markdown: string;
  };
  series: {
    name: string;
  };
}

export default function BlogList({
  posts,
  query,
  sort,
  filter,
}: {
  posts: Post[];
  query?: string;
  sort?: string;
  filter?: string;
}) {
  posts = posts
    .filter((post) => {
      const matchesQuery = query
        ? post.content.markdown.toLowerCase().includes(query.toLowerCase())
        : true;

      const matchesFilter = filter ? post.series?.name === filter : true;

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
    </>
  );
}
