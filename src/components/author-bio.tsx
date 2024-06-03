import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardTitle } from "./ui/card";
import { MarkdownToHtml } from "./markdown-to-html";

export default function AuthorBio({ author }: { author: any }) {
  return (
    <Card className="p-4 space-y-4">
      <CardTitle>Written by</CardTitle>
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={author.profilePicture} className="object-cover" />
          <AvatarFallback>{getInitials(author.name)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium leading-none">{author.name}</p>
        </div>
      </div>
      <MarkdownToHtml contentMarkdown={author.bio.markdown} className="px-0" />
    </Card>
  );
}
