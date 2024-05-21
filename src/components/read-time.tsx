import { BookOpen } from "lucide-react";

type Props = { readTimeInMinutes: number };

export const ReadTimeInMinutes = ({ readTimeInMinutes }: Props) => {
  return (
    <>
      <p className="flex flex-row items-center">
        <BookOpen className="mr-2 h-5 w-5 fill-none " />
        <span>{readTimeInMinutes} min read</span>
      </p>
    </>
  );
};
