import Subscribe from "@/components/subscribe";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed z-50 xl:bottom-10 xl:right-10 bottom-3 right-3">
        <Subscribe />
      </div>
      {children}
    </>
  );
}
