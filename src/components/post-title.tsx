import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export const PostTitle = ({ children }: Props) => {
  return (
    <div className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter leading-tight md:leading-none text-center">
      <h1 className="px-4">{children}</h1>
    </div>
  );
};
