"use server";

import { query } from "../graphql";
import { subscribe } from "./queries";
import { Post } from "@/app/blog/[slug]/page";
import { getPostsByPublication } from "./queries";
import { revalidatePath } from "next/cache";

export const subscribeToNewsletter = async (email: string) => {
  let status = "ERROR";
  let message = "An unknown error occurred. Please try again later.";

  if (!process.env.HASHNODE_PUBLICATION_ID) {
    message = "Publication ID is not defined.";
    return { status, message };
  }

  const response = await query({
    query: subscribe,
    variables: {
      input: {
        email: email,
        publicationId: process.env.HASHNODE_PUBLICATION_ID,
      },
    },
  });

  if (response.data?.subscribeToNewsletter.status === "PENDING") {
    status = "PENDING";
    message =
      "Thank you! You're almost there. Please check your email to confirm your subscription. We're excited to have you on board! 🎉";
  } else if (response.errors?.[0]?.message === "Email already subscribed") {
    message = "Looks like you're already on our list!";
  } else if (response.errors?.length > 0) {
    message = response.errors[0].message;
  }

  return { status, message };
};

export async function fetchPublication(first: number, after?: string) {
  const {
    data: { publication },
  } = await query({
    query: getPostsByPublication,
    variables: {
      host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
      first: first,
      after: after,
    },
    revalidate: 3600,
  });
  revalidatePath("/blog", "page");
  return publication;
}

export async function getPosts() {
  let allPosts: Post[] = [];
  let hasNextPage = true;
  let after = null;

  while (hasNextPage) {
    const publication = await fetchPublication(10, after);

    const posts: Post[] = publication?.posts?.edges.map(
      ({ node }: { node: Post }) => node
    );

    allPosts = [...allPosts, ...posts];

    if (publication?.posts?.pageInfo?.hasNextPage) {
      after = publication.posts.pageInfo.endCursor;
    } else {
      hasNextPage = false;
    }
  }

  return allPosts;
}

export async function getSeries() {
  const posts = await getPosts();
  const series: { [key: string]: { name: string; posts: number } } =
    posts.reduce(
      (acc: { [key: string]: { name: string; posts: number } }, post) => {
        if (post.series) {
          if (!acc[post.series.name]) {
            acc[post.series.name] = {
              name: post.series.name,
              posts: 0,
            };
          }
          acc[post.series.name].posts++;
        }
        return acc;
      },
      {}
    );
  return Object.values(series);
}

