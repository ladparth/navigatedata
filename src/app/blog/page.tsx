import BlogList, { Post } from "@/components/blog-list";
import { BlogFilter } from "@/components/filter";
import Search from "@/components/search";
import Sort, { SortOrder } from "@/components/sort";
import { query } from "@/lib/graphql";
import { getPostsByPublication } from "@/lib/hashnode/queries";
import { addPublicationJsonLd } from "@/lib/seo/addPublicationJsonLd";
import { Metadata } from "next/types";

export const revalidate = 10;
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

export async function generateMetadata(): Promise<Metadata> {
  const {
    data: { publication },
  } = await query({
    query: getPostsByPublication,
    variables: { host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST },
  });

  const metadata: Metadata = {
    title: "NavigateData Blog",
    description: publication.descriptionSEO,
    category: "Data Engineering & Analytics",
    publisher: "NavigateData",
    twitter: {
      site: "@PSL4d",
      card: "summary_large_image",
      creator: "@PSL4d",
      images: publication.ogMetaData.image,
      title: publication.title,
    },
    openGraph: {
      title: "NavigateData Blog",
      description: publication.descriptionSEO,
      images: [
        {
          url: publication.ogMetaData.image,
          alt: publication.title,
        },
      ],
    },
  };

  return metadata;
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

  const series = publication.seriesList.edges.map(
    ({ node }: { node: SeriesItem }) => node
  );
  const seriesItems = series
    .map((item: SeriesItem) => ({
      name: item.name,
      count: item.posts.totalDocuments,
    }))
    .sort((a: { name: string }, b: { name: string }) =>
      a.name.localeCompare(b.name)
    );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(addPublicationJsonLd(publication)),
        }}
      />
      <div className="relative flex-1 flex flex-col">
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
    </>
  );
}
