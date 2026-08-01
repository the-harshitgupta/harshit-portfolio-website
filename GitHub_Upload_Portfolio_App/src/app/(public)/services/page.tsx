import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import CTASection from "@/components/CTASection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { processSteps, site } from "@/lib/site";
import { getPublishedServices } from "@/lib/services";
import { getPublishedTestimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  // Title template appends " | Harshit Gupta" (16 chars), so the page title
  // must stay under ~44 characters to avoid SERP truncation.
  title: "Marketing & Growth Strategy Services",
  description:
    "GTM plans, ICP research, positioning, content strategy and marketing analytics for founders. Clear deliverables, fixed pricing in INR and USD.",
  alternates: { canonical: `${site.url}/services` },
};

export const revalidate = 60;

export default async function ServicesPage() {
  const [services, testimonials] = await Promise.all([
    getPublishedServices(),
    getPublishedTestimonials(),
  ]);

  return (
    <>
      <section className="py-20">
        <div className="wrap">
          <SectionHead
            as="h1"
            tag="Services & Pricing"
            title="Pick the outcome you need next."
            subtitle="Productized engagements with clear scope, timelines, and pricing in INR and USD. Need something custom? Just ask in the contact form."
          />
          <div className="grid auto-rows-fr gap-6 md:grid-cols-2">
            {services.map((s, i) => {
              const isHero = /audit/i.test(s.slug) || /audit/i.test(s.title);
              return (
              <Reveal key={s.title} delay={(i % 2) * 60}>
                <div
                  className={`card-base flex h-full flex-col p-8 ${
                    isHero ? "relative ring-2 ring-teal" : ""
                  }`}
                >
                  {isHero && (
                    <span className="absolute -top-3 left-6 rounded-full bg-teal-deep px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-white shadow">
                      Start here
                    </span>
                  )}
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[13px] bg-gradient-to-br from-teal to-teal-deep text-xl text-white">
                      {s.icon}
                    </div>
                    <div className="shrink-0 rounded-full bg-teal-soft px-3 py-1 text-[0.82rem] font-bold text-teal-deep">
                      {s.price}
                    </div>
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-semibold">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[0.94rem] text-muted">{s.blurb}</p>
                  <ul className="mt-4 flex-1 space-y-2 text-[0.92rem] text-muted">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5">
                        <span className="mt-0.5 text-teal-deep">&#10003;</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <Link
                      href={`/services/${s.slug}`}
                      className="btn btn-primary"
                    >
                      View service details
                    </Link>
                  </div>
                </div>
              </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white py-20">
        <div className="wrap">
          <SectionHead tag="How I Work" title="A clear, fast process." center />
          <div className="grid gap-5 md:grid-cols-4">
            {processSteps.map((p, i) => (
              <Reveal key={p.num} delay={i * 60}>
                <div className="card-base h-full p-7">
                  <div className="font-serif text-3xl font-extrabold leading-none text-[#cfe6e6]">
                    {p.num}
                  </div>
                  <h3 className="mt-2.5 font-serif text-[1.05rem] font-semibold">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[0.9rem] text-muted">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} />

      <CTASection />
    </>
  );
}
