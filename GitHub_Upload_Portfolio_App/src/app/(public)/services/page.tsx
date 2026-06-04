import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import CTASection from "@/components/CTASection";
import { services, processSteps } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "GTM strategy, ICP & buyer persona research, brand positioning, marketing analytics, and AI content strategy. Clear deliverables with INR and USD pricing.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="py-20">
        <div className="wrap">
          <SectionHead
            tag="Services & Pricing"
            title="Pick the outcome you need next."
            subtitle="Productized engagements with clear scope, timelines, and pricing in INR and USD. Need something custom? Just ask in the contact form."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 60}>
                <div className="card-base flex h-full flex-col p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-[13px] bg-gradient-to-br from-teal to-teal-deep text-xl text-white">
                      {s.icon}
                    </div>
                    <div className="rounded-full bg-teal-soft px-3 py-1 text-[0.82rem] font-bold text-teal-deep">
                      {s.price}
                    </div>
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-semibold">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[0.94rem] text-muted">{s.blurb}</p>
                  <ul className="mt-4 space-y-2 text-[0.92rem] text-muted">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5">
                        <span className="mt-0.5 text-teal-deep">&#10003;</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/contact?need=${encodeURIComponent(s.title)}`}
                    className="btn btn-primary mt-6 self-start"
                  >
                    Request this service
                  </Link>
                </div>
              </Reveal>
            ))}
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

      <CTASection />
    </>
  );
}
