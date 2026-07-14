const towns = [
  "Matthews",
  "Charlotte",
  "Mint Hill",
  "Indian Trail",
  "Weddington",
  "Waxhaw",
  "Stallings",
  "Monroe",
  "Pineville",
  "Ballantyne",
];

export default function ServiceArea() {
  return (
    <section id="service-area" className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Based in Matthews. Serving the Charlotte metro.
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Hass Electrical is a locally owned residential electrical
              contractor headquartered in Matthews, NC. We know the housing
              stock in this area &mdash; from older homes near uptown
              Charlotte to newer builds out toward Waxhaw and Indian Trail
              &mdash; and we bring that experience to every job.
            </p>
            <p className="mt-4 text-lg text-slate-600">
              Not sure if you&apos;re in our service area? Reach out and
              we&apos;ll let you know.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-8">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Areas we serve
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-y-3 sm:grid-cols-2">
              {towns.map((town) => (
                <li key={town} className="flex items-center gap-2 text-slate-800">
                  <svg
                    className="h-4 w-4 flex-none text-amber-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21s-7-6.1-7-11a7 7 0 1114 0c0 4.9-7 11-7 11z"
                    />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  <span className="text-sm font-medium">{town}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
