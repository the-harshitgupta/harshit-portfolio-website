import Link from "next/link";
import { nav, resourceLinks, site } from "@/lib/site";
import { getPublishedServices } from "@/lib/services";

export default async function Footer() {
  const year = new Date().getFullYear();
  const services = await getPublishedServices();
  return (
    <footer className="mt-24 border-t border-line bg-white">
      <div className="wrap grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <div>
          <div className="font-serif text-xl font-extrabold">
            Harshit<span className="text-teal-deep">.</span>Gupta
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted">
            {site.role}. I help startups, D2C brands, and small businesses turn
            unclear marketing into a focused customer strategy.
          </p>
          <Link href="/contact" className="btn btn-primary mt-5">
            Get My Free 3-Point Audit
          </Link>
        </div>

        <div>
          <div className="sec-tag mb-3">Explore</div>
          <ul className="space-y-2 text-sm text-muted">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-teal-deep">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="sec-tag mb-3">Services</div>
          <ul className="space-y-2 text-sm text-muted">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="hover:text-teal-deep"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="sec-tag mb-3">Resources</div>
          <ul className="space-y-2 text-sm text-muted">
            {resourceLinks.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="hover:text-teal-deep">
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="sec-tag mb-3">Connect</div>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-teal-deep">
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-deep"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={site.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-deep"
              >
                X
              </a>
            </li>
            <li>
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-deep"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={site.socials.fiverr}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-deep"
              >
                Fiverr
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="wrap flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted sm:flex-row">
          <span>
            &copy; {year} {site.name} &middot; {site.role}
          </span>
          <span className="flex flex-wrap items-center justify-center gap-3">
            <span>{site.location}</span>
            <Link href="/privacy" className="hover:text-teal-deep">
              Privacy Policy
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
