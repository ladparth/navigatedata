export default function AnimatedText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className="font-medium inline-flex animate-background-shine bg-[linear-gradient(110deg,#0891B2,45%,#1e293b,55%,#0891B2)] bg-[length:250%_100%] bg-clip-text text-xl text-transparent">
      {children}
    </span>
  );
}
