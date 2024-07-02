import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardTitle } from "./ui/card";
import { MarkdownToHtml } from "./markdown-to-html";
import Link from "next/link";

export default function AuthorBio({ author }: { author: any }) {
  return (
    <div className="grid gap-4 mx-auto w-full md:max-w-screen-md">
      <CardTitle>Written by</CardTitle>
      <div className="flex items-center space-x-4">
        <Link href="/about">
          <Avatar>
            <AvatarImage src={author.profilePicture} className="object-cover" />
            <AvatarFallback>{getInitials(author.name)}</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <p className="text-sm font-medium leading-none">{author.name}</p>
        </div>
      </div>
      <MarkdownToHtml contentMarkdown={author.bio.markdown} className="px-0" />
    </div>
  );
}
