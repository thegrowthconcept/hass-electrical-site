const services = [
  {
    title: "Accent & Decorative Lighting",
    description:
      "Recessed lighting, under-cabinet fixtures, and outdoor accent lighting installed cleanly and up to code.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c.6.6 1 1.4 1 2.5h6c0-1.1.4-1.9 1-2.5A6 6 0 0012 3z"
      />
    ),
  },
  {
    title: "Outlet & Switch Installation",
    description:
      "New outlets, GFCI/AFCI upgrades, dimmer switches, and repairs for outlets that are outdated, overloaded, or dead.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 7V3m6 4V3M7 7h10a2 2 0 012 2v3a5 5 0 01-5 5v3m0 0H8a1 1 0 01-1-1v-2m7 0H8m1-5a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z"
      />
    ),
  },
  {
    title: "Panel Upgrades",
    description:
      "Replace an aging or undersized panel with one sized for how your home actually uses power today.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 3h14a1 1 0 011 1v16a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1zM8 7h8M8 11h8M8 15h4"
      />
    ),
  },
  {
    title: "Breaker Repair & Replacement",
    description:
      "Tripping breaker? We track down the cause and replace faulty breakers so your circuits run safely.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12l1-8.5z"
      />
    ),
  },
  {
    title: "Ceiling Fans & Fixtures",
    description:
      "Fan and light fixture installation, including new wiring and proper box support where needed.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 12v9m0-9c3 0 5-3 8-2-1 3-4 5-8 4m0-2c-3 0-5-3-8-2 1 3 4 5 8 4m0-2c1-3 0-7-3-9 3-1 6 1 7 4m-4 5c-1-3 0-7 3-9-3-1-6 1-7 4M12 12a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
      />
    ),
  },
  {
    title: "Whole-Home Rewiring",
    description:
      "Full or partial rewires for older homes, additions, and renovations that have outgrown their original wiring.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12h4l2-6 4 12 2-6h6"
      />
    ),
  },
  {
    title: "Troubleshooting & Repairs",
    description:
      "Flickering lights, dead outlets, warm switches — we find the actual cause instead of just treating the symptom.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 3a4 4 0 00-4 4c0 1.3.6 2.2 1.3 3L6 12.3a2 2 0 000 2.8l2.9 2.9a2 2 0 002.8 0L14 15.7c.8.7 1.7 1.3 3 1.3a4 4 0 004-4 4 4 0 00-4-4c-.4 0-.8.1-1.2.2L12.8 6c.1-.4.2-.8.2-1.2a4 4 0 00-2-3z"
      />
    ),
  },
  {
    title: "Inspections & Code Corrections",
    description:
      "Pre-listing inspections, insurance-required repairs, and bringing older wiring up to current code.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3l7 3v6c0 4.5-3 8.5-7 9-4-.5-7-4.5-7-9V6l7-3z"
      />
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Electrical services for every part of your home
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Whether it&apos;s one outlet or a full panel replacement, our
            licensed electricians handle residential jobs of every size
            across Matthews and the Charlotte metro.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-lg border border-slate-200 p-6 transition-shadow hover:shadow-md"
            >
              <svg
                className="h-9 w-9 text-amber-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
              >
                {service.icon}
              </svg>
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
