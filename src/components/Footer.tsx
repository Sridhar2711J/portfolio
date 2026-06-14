import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-card-border bg-subtle-bg py-8 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Link href="/" className="flex items-center gap-1.5 font-bold text-xl tracking-tight">
            <span className="text-primary font-extrabold">SJ</span>
            <span className="text-[#13b593] dark:text-[#14cfab]">Developer</span>
          </Link>
          <p className="text-sm text-accent-gray">
            © {new Date().getFullYear()} Sridhar J's Portfolio. All rights reserved..
          </p>
          <div className="flex gap-4 text-sm text-accent-gray">
            <a href="/contact" className="hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
