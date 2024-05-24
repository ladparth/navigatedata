interface Query {
  query: string;
  variables?: object;
  tags?: Array<string>;
  revalidate?: number;
}

export async function query({ query, variables, tags, revalidate }: Query) {
  const data = await fetch(process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    next: {
      tags,
      revalidate,
    },
  }).then((r) => r.json());
  return data;
}
