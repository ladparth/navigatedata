interface Query {
  query: string;
  variables?: object;
  tags?: NextFetchRequestConfig["tags"];
  revalidate?: NextFetchRequestConfig["revalidate"];
  cache?: RequestCache;
}

interface PostRequestConfig {
  method: "POST";
  headers: {
    "Content-Type": "application/json";
  };
  body: string;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

export async function query({
  query,
  variables,
  tags,
  revalidate,
  cache,
}: Query) {
  const postRequestConfig: PostRequestConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  };

  if (cache) {
    postRequestConfig.cache = cache;
  }

  if (tags || revalidate) {
    postRequestConfig.next = {
      tags,
      revalidate,
    };
  }

  const res = await fetch(
    process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT!,
    postRequestConfig
  );

  const data = await res.json();
  return data;
}
