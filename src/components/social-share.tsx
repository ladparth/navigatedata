"use client";

import { toast } from "sonner";
import { PermalinkIcon, ShareIcon } from "./icons";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
} from "next-share";
export function SocialShare({ title, slug }: { title: string; slug: string }) {
  const url = `https://blog.thenavigatedata.com/posts/${slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    toast("Link copied to clipboard 📋");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="rounded-lg py-2">
          <ShareIcon fill="currentColor" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-14 flex flex-col gap-3 items-center" side="top">
        <Button variant="ghost" size="icon" onClick={handleCopy}>
          <PermalinkIcon />
        </Button>
        <EmailShareButton
          url={url}
          subject={title}
          body={`Check out this post on NavigateData:`}
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
        <FacebookShareButton url={url} quote={title} hashtag="#NavigateData">
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={url} title={title} hashtags={["NavigateData"]}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton
          url={url}
          title={title}
          summary={`Check out this post on NavigateData:`}
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <RedditShareButton url={url} title={title}>
          <RedditIcon size={32} round />
        </RedditShareButton>
      </PopoverContent>
    </Popover>
  );
}
