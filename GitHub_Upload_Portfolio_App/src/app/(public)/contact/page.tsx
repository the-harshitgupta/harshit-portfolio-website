import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import TestimonialsSection from "@/components/TestimonialsSection";
import { site } from "@/lib/site";
import { getPublishedServices } from "@/lib/services";
import { getPublishedTestimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Contact - Free 3-Point Audit",
  description:
    "Request a free 3-point marketing audit. Tell Harshit Gupta about your business and get one positioning gap, one funnel issue, and one growth opportunity.",
  alternates: { canonical: `${site.url}/contact` },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: { need?: string };
}) {
  const [testimonials, services] = await Promise.all([
    getPublishedTestimonials(),
    getPublishedServices(),
  ]);

  return (
    <>
      <section className="py-20">
        <div className="wrap grid gap-12 md:grid-cols-2">
          <Reveal>
            <div className="sec-tag">Let&apos;s Talk</div>
            <h1 className="mt-3 font-serif text-[clamp(1.9rem,3.4vw,2.6rem)] font-bold leading-tight tracking-tight">
              Request a free 3-point audit.
            </h1>
            <p className="mt-4 text-muted">
              Tell me about your business and what you want to improve. I&apos;ll
              send a quick audit covering one positioning gap, one content or
              funnel issue, and one growth opportunity, with no obligation.
            </p>

            <div className="mt-8 space-y-3 text-[0.95rem]">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 text-ink hover:text-teal-deep"
              >
                <Ico>&#9993;</Ico> {site.email}
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-ink hover:text-teal-deep"
              >
                <Ico>in</Ico> LinkedIn
              </a>
              <a
                href={site.socials.fiverr}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-ink hover:text-teal-deep"
              >
                <Ico>&#9733;</Ico> Fiverr profile
              </a>
            </div>

            <div className="card-base mt-8 bg-white p-6">
              <h3 className="font-serif text-lg font-bold text-navy">
                What happens next?
              </h3>
              <ol className="mt-3 space-y-2 text-sm text-muted">
                <li>1. You send the form (name and email is enough).</li>
                <li>
                  2. I review your site/offer and reply within 1 business day.
                </li>
                <li>3. We hop on a short call if it&apos;s a fit.</li>
              </ol>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ContactForm
              defaultNeed={searchParams.need || ""}
              options={services.map((s) => s.title)}
            />
          </Reveal>
        </div>
      </section>
      <TestimonialsSection testimonials={testimonials} />
    </>
  );
}

function Ico({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid h-9 w-9 place-items-center rounded-[11px] border border-line bg-cream text-sm font-semibold text-navy">
      {children}
    </span>
  );
}
