export default function Hero() {
  return (
    <section className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-400">
            Matthews, NC &middot; Charlotte Metro
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Residential electrical work done right, the first time.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            From accent lighting and outlet installs to full panel upgrades
            and breaker work, Hass Electrical brings licensed, insured
            expertise to homes across Matthews and the greater Charlotte
            metro. Straightforward pricing, clean installs, and electricians
            who show up when they say they will.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {/* TODO: replace with finalized business phone number */}
            <a
              href="tel:+17045550123"
              className="rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
            >
              Call (704) 555-0123
            </a>
            <a
              href="#contact"
              className="rounded-md border border-slate-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-slate-400 hover:bg-slate-800"
            >
              Request a Quote
            </a>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-slate-800 pt-8 sm:grid-cols-4">
            {[
              "Licensed & Insured",
              "Locally Owned",
              "Upfront Pricing",
              "Matthews Based",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <svg
                  className="mt-0.5 h-5 w-5 flex-none text-amber-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <dt className="text-sm font-medium text-slate-200">{item}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
