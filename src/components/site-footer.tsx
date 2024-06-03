export function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
        <p className="flex items-center justify-center text-secondary-center dimmed-3 text-sm">
          &copy; {new Date().getFullYear()} Parth Lad. All rights reserved
        </p>
      </div>
    </footer>
  );
}
