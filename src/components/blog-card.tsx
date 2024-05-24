import Link from "next/link";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { getInitials } from "@/lib/utils";
import { DateFormatter } from "./date-formatter";

interface BlogCardProps {
  imageUrl: string;
  series: string;
  title: string;
  description: string;
  time: string;
}

export default function BlogCard({
  imageUrl,
  series,
  title,
  description,
  time,
}: BlogCardProps) {
  return (
    <Card className="w-full h-full p-0 xl:flex">
      <CardHeader className="p-4 md:py-6 justify-center">
        <Image
          src={imageUrl}
          width={1600}
          height={880}
          alt="hero"
          className="xl:max-w-sm rounded-lg"
        />
      </CardHeader>
      <CardContent className="xl:flex-1 flex gap-4 p-4 md:gap-8 md:p-6 items-center">
        <div className="w-full h-full flex flex-col space-y-4">
          <div className="w-full flex flex-wrap justify-between">
            {series ? <Badge variant="secondary">{series}</Badge> : <div></div>}
            <DateFormatter dateString={time} />
          </div>
          <p className="title md:leading-8 text-2xl">{title}</p>
          <p className="text-sm">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
