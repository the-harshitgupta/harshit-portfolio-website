import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import CTASection from "@/components/CTASection";
import { getPublishedWork } from "@/lib/work";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work & Case Samples",
  description:
    "Sample GTM, ICP, and brand strategy projects - B2B SaaS go-to-market, D2C buyer personas, and productized ICP research deliverables.",
  alternates: { canonical: `${site.url}/work` },
};

export default async function WorkPage() {
  const works = await getPublishedWork();

  return (
    <>
      <section className="py-20">
        <div className="wrap">
          <SectionHead
            as="h1"
            tag="Selected Work"
            title="Strategy projects & sample deliverables."
            subtitle="These are representative samples that show the structure and depth of my work: the problem, the research, the strategy, and the deliverable."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {works.map((w, i) => (
              <Reveal key={w.title} delay={i * 60}>
                <div className="card-base group h-full overflow-hidden transition hover:-translate-y-1.5 hover:shadow-soft">
                  <div className="aspect-[16/10] overflow-hidden border-b border-line bg-[#eef4f4]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={w.image}
                      alt={w.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-[0.74rem] font-bold uppercase tracking-wide text-teal-deep">
                      {w.tag}
                    </div>
                    <h3 className="mt-2 font-serif text-[1.12rem] font-semibold">
                      {w.title}
                    </h3>
                    <p className="mt-2 text-[0.9rem] text-muted">{w.desc}</p>
                    <a
                      href={w.href}
                      target={w.href.endsWith(".pdf") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="mt-3.5 inline-flex items-center gap-1.5 text-[0.88rem] font-semibold text-navy hover:text-teal-deep"
                    >
                      {w.cta} &#8594;
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <div className="card-base bg-white p-8 text-center">
              <h3 className="font-serif text-xl font-bold text-navy">
                Want a sample tailored to your industry?
              </h3>
              <p className="mx-auto mt-2 max-w-xl text-muted">
                Tell me your niche and I&apos;ll share the closest relevant sample
                plus how I&apos;d approach your project.
              </p>
              <a href="/contact" className="btn btn-primary mt-5">
                Request a Relevant Sample
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
