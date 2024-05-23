import BlogCard from "@/components/blog-card";
import BlogList, { Post } from "@/components/blog-list";
import { BlogFilter } from "@/components/filter";
import Search from "@/components/search";
import { SiteHeader } from "@/components/site-header";
import Sort, { SortOrder } from "@/components/sort";
import { query } from "@/lib/graphql";
import {
  GetPostsBySeries,
  getPostsByPublication,
} from "@/lib/hashnode/queries";

export interface BlogPageProps {
  searchParams?: {
    query?: string;
    sort?: SortOrder;
    filter?: string;
  };
}

export interface SeriesItem {
  name: string;
  posts: {
    totalDocuments: number;
  };
}

export default async function Home({ searchParams }: BlogPageProps) {

  const {
    data: { publication },
  } = await query({
    query: getPostsByPublication,
    variables: { host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST },
  });

  const posts: Post[] = publication.posts.edges.map(
    ({ node }: { node: Post }) => node
  );

  const {
    data: {
      publication: { seriesList },
    },
  } = await query({
    query: GetPostsBySeries,
    variables: { host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST },
  });

  const series = seriesList.edges.map(({ node }: { node: SeriesItem }) => node);

  const seriesItems = series.map((item: SeriesItem) => ({
    name: item.name,
    count: item.posts.totalDocuments,
  }));

  return (
    <div className="relative flex flex-col">
      <SiteHeader nav />
      <main className="flex flex-col flex-1 p-6">
        <div className="w-full mr-auto ml-auto flex-1 flex flex-col items-center space-y-4 max-w-screen-2xl">
          <div className="flex gap-2 w-full md:w-2/3">
            <Search placeholder="Search posts..." />
            <Sort />
            <BlogFilter items={seriesItems} title="Filter by Series" />
          </div>
          <BlogList
            posts={posts}
            query={searchParams?.query}
            filter={searchParams?.filter}
            sort={searchParams?.sort}
          />
        </div>
      </main>
    </div>
  );
}
