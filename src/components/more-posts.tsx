import { getPosts } from "@/lib/hashnode/actions";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";
import AdUnit from "./ad-unit";

export default async function MorePosts({ series }: { series: string }) {
  const posts = await getPosts();
  const filteredPosts = posts
    .filter((post) => {
      return post.series?.name === series;
    })
    .slice(0, 5);
  return (
    <>
      {filteredPosts.map((post, index) => (
        <div key={post.slug} className="space-y-2">
          <Link href={`/blog/${post.slug}`}>
            <div className="w-full space-y-2">
              <Image
                src={post.coverImage.url}
                width={1600}
                height={880}
                alt="hero"
                className="rounded-lg"
              />
              <h2 className="font-semibold">{post.title}</h2>
            </div>
          </Link>
          <Separator />
          {(index + 1) % 2 === 0 && (
            <DisplayAdUnit
              className="w-full mx-auto p-4 rounded-lg shadow-md"
              format="rectangle"
            />
          )}
        </div>
      ))}
      <DisplayAdUnit
        className="w-full mx-auto p-4 rounded-lg shadow-md"
        format="auto"
      />

      {Array.from({ length: 5 }).map((_, index) => (
        <DisplayAdUnit
          key={index}
          className="w-full mx-auto p-4 rounded-lg shadow-md"
          format="auto"
        />
      ))}
    </>
  );
}

function DisplayAdUnit({
  className,
  format,
}: {
  className?: string;
  format?: string;
}) {
  return (
    <div className={className}>
      <AdUnit>
        <ins
          className="adsbygoogle"
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUB_ID!}
          style={{ display: "block" }}
          data-ad-slot="6759868245"
          data-ad-format={format}
          data-full-width-responsive="true"
        ></ins>
      </AdUnit>
    </div>
  );
}
