"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { subscribeToNewsletter } from "@/lib/hashnode/actions";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { CheckCircle, Hourglass } from "lucide-react";

const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export function SubscribeForm() {
  const [message, setMessage] = useState<string>("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await subscribeToNewsletter(data.email);
    setMessage(response.message);
  }

  return (
    <>
      {message ? (
        <Alert className="flex flex-col justify-center items-center border-none">
          <div className="mb-2">
            {message === "Looks like you're already on our list!" ? (
              <CheckCircle color="green" />
            ) : (
              <Hourglass color="orange" />
            )}
          </div>
          <AlertTitle>
            {message === "Looks like you're already on our list!"
              ? "Already Subscribed"
              : "Subscription Pending"}
          </AlertTitle>
          <AlertDescription className="text-center">{message}</AlertDescription>
        </Alert>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="connect@thenavigatedata.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Subscribe to our newsletter for latest updates.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}
