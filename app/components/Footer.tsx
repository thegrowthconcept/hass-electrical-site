export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <span className="text-lg font-bold tracking-tight text-white">
              Hass <span className="text-amber-400">Electrical</span>
            </span>
            <p className="mt-3 text-sm leading-6">
              Licensed, insured residential electrical contractor based in
              Matthews, NC, serving homeowners across the Charlotte metro.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
              Quick Links
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#services" className="hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#service-area" className="hover:text-white">
                  Service Area
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white">
                  Request a Quote
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
              Contact
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                {/* TODO: replace with finalized business phone number */}
                <a href="tel:+17045550123" className="hover:text-white">
                  (704) 555-0123
                </a>
              </li>
              <li>
                {/* TODO: replace with finalized business email address */}
                <a
                  href="mailto:info@hasselectricalnc.com"
                  className="hover:text-white"
                >
                  info@hasselectricalnc.com
                </a>
              </li>
              <li>Matthews, NC</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-xs">
          {`© ${year} Hass Electrical. Licensed & insured in North Carolina. All rights reserved.`}
        </div>
      </div>
    </footer>
  );
}
