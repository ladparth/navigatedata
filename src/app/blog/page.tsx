import BlogList from "@/components/blog-list";
import { BlogFilter } from "@/components/filter";
import Search from "@/components/search";
import Sort, { SortOrder } from "@/components/sort";
import { fetchPublication, getPosts, getSeries } from "@/lib/hashnode/actions";
import { addPublicationJsonLd } from "@/lib/seo/addPublicationJsonLd";
import { Metadata } from "next/types";

export interface BlogPageProps {
  searchParams?: {
    query?: string;
    sort?: SortOrder;
    filter?: string;
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const publication = await fetchPublication(1);
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/blog`;

  const metadata: Metadata = {
    title: "Blog",
    description: publication.descriptionSEO,
    alternates: {
      canonical: url,
    },
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
      siteName: "NavigateData Blog",
      url,
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
  const posts = await getPosts();
  const publication = await fetchPublication(1);
  const series = await getSeries();

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
              <BlogFilter items={series} title="Filter by Series" />
            </div>
            <BlogList
              initialPosts={posts}
              initialPageInfo={publication.posts.pageInfo}
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
