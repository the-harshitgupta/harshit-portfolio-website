import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Harshit Gupta - a marketer with 5+ years in business operations, brand strategy, and marketing. ICP research, GTM, positioning, analytics, and AI for marketing.",
};

const skills = [
  "GTM Strategy",
  "ICP & Personas",
  "Brand Positioning",
  "Marketing Analytics",
  "Power BI",
  "AI for Marketing",
  "Content Strategy",
  "Competitive Research",
];

const fixes = [
  "Unclear positioning that sounds like every competitor",
  "A vague target audience that makes content feel random",
  "Offers and messaging buyers don't understand fast enough",
  "Marketing activity with no clear way to measure what works",
  "A launch or relaunch with no practical GTM roadmap",
];

const diffs = [
  "Research-first: decisions come from reviews, competitors, and data, not guesswork.",
  "Practical deliverables your team can execute, not 60-page decks no one reads.",
  "AI-assisted speed without losing strategic judgement.",
  "Comfortable with both Indian MSMEs/D2C and global B2B/SaaS clients.",
];

export default function AboutPage() {
  return (
    <>
      <section className="py-20">
        <div className="wrap">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <Reveal>
              <div className="sec-tag">About</div>
              <h1 className="mt-3 font-serif text-[clamp(1.9rem,3.6vw,2.7rem)] font-bold leading-tight tracking-tight">
                A marketer who turns confusion into a clear customer strategy.
              </h1>
              <p className="mt-5 text-muted">
                With 5+ years across business operations, brand strategy, and
                marketing, including research and brand strategy at a fintech
                firm, I focus on one thing: helping businesses understand who
                they serve and how to communicate value.
              </p>
              <p className="mt-4 text-muted">
                I combine market research, marketing analytics, and AI-assisted
                workflows to move brands from random posting and unclear offers
                to a focused, executable growth system.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {skills.map((s) => (
                  <span key={s} className="pill">
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative mx-auto w-[min(380px,85vw)] overflow-hidden rounded-[26px] border-[6px] border-white bg-[#dceeef] shadow-soft">
                <Image
                  src="/harshit.png"
                  alt={`${site.name}, ${site.role}`}
                  width={440}
                  height={540}
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white py-20">
        <div className="wrap grid gap-10 md:grid-cols-2">
          <Reveal>
            <h2 className="font-serif text-2xl font-bold text-navy">
              What I help you fix
            </h2>
            <ul className="mt-5 space-y-3">
              {fixes.map((f) => (
                <li key={f} className="flex gap-3 text-muted">
                  <span className="mt-1 text-teal-deep">&#10003;</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-serif text-2xl font-bold text-navy">
              How I&apos;m different
            </h2>
            <ul className="mt-5 space-y-3 text-muted">
              {diffs.map((d) => (
                <li key={d} className="flex gap-3">
                  <span className="mt-1 text-teal-deep">&#8594;</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
