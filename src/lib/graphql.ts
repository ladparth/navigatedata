interface Query {
  query: string;
  variables?: object;
  tags?: NextFetchRequestConfig["tags"];
  revalidate?: NextFetchRequestConfig["revalidate"];
  cache?: RequestCache;
}

export async function query({
  query,
  variables,
  tags,
  revalidate,
  cache,
}: Query) {
  const res = await fetch(process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: cache,
    body: JSON.stringify({
      query,
      variables,
    }),
    next: {
      tags,
      revalidate,
    },
  });
  const data = await res.json();
  return data;
}
