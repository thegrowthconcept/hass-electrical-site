import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-lg font-bold tracking-tight text-white">
            Hass <span className="text-amber-400">Electrical</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
          <a href="#services" className="transition-colors hover:text-white">
            Services
          </a>
          <a href="#service-area" className="transition-colors hover:text-white">
            Service Area
          </a>
          <a href="#contact" className="transition-colors hover:text-white">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-4">
          {/* TODO: replace with finalized business phone number */}
          <a
            href="tel:+17045550123"
            className="hidden text-sm font-semibold text-slate-200 hover:text-white sm:block"
          >
            (704) 555-0123
          </a>
          <a
            href="#contact"
            className="rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </header>
  );
}
