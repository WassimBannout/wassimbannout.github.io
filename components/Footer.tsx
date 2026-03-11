export default function Footer() {
  return (
    <footer className="border-t border-line px-6 md:px-12 py-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <span className="font-inter text-xs text-muted">
          © {new Date().getFullYear()} Wassim Bannout
        </span>
        <span className="font-inter text-xs text-muted">
          Built with Next.js &amp; Tailwind CSS
        </span>
      </div>
    </footer>
  );
}
