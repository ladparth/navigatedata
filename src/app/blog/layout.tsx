import ScrollToTopButton from "@/components/back-to-top";
import Subscribe from "@/components/subscribe";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed flex gap-2 z-50 xl:bottom-10 xl:right-10 bottom-3 right-3">
        <ScrollToTopButton />
        <Subscribe />
      </div>
      {children}
    </>
  );
}
