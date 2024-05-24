"use server";

import { query } from "../graphql";
import { subscribe } from "./queries";

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
