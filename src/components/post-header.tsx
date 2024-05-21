import { CoverImage } from "./cover-image";
import { DateFormatter } from "./date-formatter";
import { ReadTimeInMinutes } from "./read-time";
import { PostTitle } from "./post-title";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getInitials } from "@/lib/utils";

type Author = Pick<any, "username" | "name" | "profilePicture">;

type Props = {
  title: string;
  coverImage: string | null | undefined;
  date: string;
  author: Author;
  readTimeInMinutes: number;
};

export const PostHeader = ({
  title,
  coverImage,
  date,
  author,
  readTimeInMinutes,
}: Props) => {
  return (
    <>
      <PostTitle >{title}</PostTitle>
      <div className="flex flex-row flex-wrap items-center justify-center w-full gap-2 px-2 text-slate-700 dark:text-neutral-300 md:px-0">
        <div className="mb-5 flex w-full flex-row items-center justify-center md:mb-0 md:w-auto md:justify-start">
          <div className="flex flex-col max-md:space-y-2 md:flex-row items-center justify-center">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={author.profilePicture} />
                <AvatarFallback>{getInitials(author.name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">
                  {author.name}
                </p>
              </div>
            </div>
            <span className="mx-3 hidden font-bold text-slate-500 md:block">
              &middot;
            </span>
            <DateFormatter dateString={date} />
            {readTimeInMinutes && (
              <span className="mx-3 hidden font-bold text-slate-500 md:block">
                &middot;
              </span>
            )}
            <ReadTimeInMinutes readTimeInMinutes={readTimeInMinutes} />
          </div>
        </div>
      </div>
      {coverImage && (
        <div className="w-full px-5 sm:mx-0">
          <CoverImage title={title} src={coverImage} priority={true} />
        </div>
      )}
    </>
  );
};
