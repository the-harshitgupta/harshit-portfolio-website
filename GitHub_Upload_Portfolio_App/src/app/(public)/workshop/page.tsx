import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "ICP & Positioning Workshop",
  description:
    "Join a beginner-friendly 90-minute ICP and positioning workshop to find your best customers, write a clearer message, and plan your next marketing actions.",
  alternates: { canonical: `${site.url}/workshop` },
};

const agenda = [
  {
    time: "0-10 min",
    title: "Why most marketing does not convert",
    desc: "Understand why vague audiences, broad messages, and random content usually fail.",
  },
  {
    time: "10-25 min",
    title: "ICP in simple language",
    desc: "Learn what an Ideal Customer Profile really means and how it differs from a generic target audience.",
  },
  {
    time: "25-40 min",
    title: "Customer research without guessing",
    desc: "Use reviews, competitor pages, LinkedIn, YouTube comments, Reddit, and AI to find real customer language.",
  },
  {
    time: "40-55 min",
    title: "Build a simple buyer persona",
    desc: "Map pains, buying triggers, objections, desired outcomes, and decision criteria.",
  },
  {
    time: "55-70 min",
    title: "Write your positioning statement",
    desc: "Use a simple formula to explain who you help, what problem you solve, and why you are different.",
  },
  {
    time: "70-80 min",
    title: "Turn ICP into content and offers",
    desc: "Create content angles, hooks, and offer messages that speak to your selected customer.",
  },
  {
    time: "80-90 min",
    title: "Q&A and next steps",
    desc: "Ask questions and learn how to apply this through a done-for-you ICP or GTM sprint.",
  },
];

const deliverables = [
  "ICP worksheet",
  "Buyer persona template",
  "Positioning statement formula",
  "30-day content idea framework",
  "Free audit path for people who want done-for-you help",
];

const socialIdeas = [
  "ICP mistake: why targeting everyone kills your conversion.",
  "Before/after positioning rewrite for a small brand.",
  "AI prompt to research customer pains from reviews.",
  "Founder lesson: one clear customer beats five vague audiences.",
  "Mini teardown: what a homepage says vs what buyers need to hear.",
  "Free checklist CTA: download and define your ICP this week.",
];

export default function WorkshopPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Find Your Best Customers: ICP & Positioning Workshop",
    description: metadata.description,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    organizer: { "@type": "Person", name: site.name, url: site.url },
    url: `${site.url}/workshop`,
    offers: {
      "@type": "Offer",
      price: "999",
      priceCurrency: "INR",
      availability: "https://schema.org/PreOrder",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-16">
        <div className="wrap grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="sec-tag">Live Workshop</div>
            <h1 className="mt-3 font-serif text-[clamp(2.1rem,4.8vw,3.5rem)] font-bold leading-tight tracking-tight">
              Find Your Best Customers: ICP & Positioning Workshop
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              A beginner-friendly 90-minute session for founders, freelancers,
              consultants, and small business owners who want clearer targeting,
              sharper messaging, and better leads.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contact?need=ICP%20%26%20Positioning%20Workshop"
                className="btn btn-primary"
              >
                Join Workshop Waitlist
              </Link>
              <Link href="/resources/icp-checklist" className="btn btn-ghost">
                Get Free Checklist First
              </Link>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="card-base bg-white p-7">
              <div className="sec-tag">First batch plan</div>
              <h2 className="mt-2 font-serif text-2xl font-bold text-navy">
                Start small. Validate demand.
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {[
                  ["Length", "90 minutes"],
                  ["First price", "Rs.999"],
                  ["Format", "Live online"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-cream p-4">
                    <div className="text-xs font-bold uppercase tracking-wide text-teal-deep">
                      {label}
                    </div>
                    <div className="mt-1 font-semibold text-navy">{value}</div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm text-muted">
                The first version should be live, not recorded. You will learn
                what people ask, what they struggle with, and what they are
                willing to buy next.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-white py-20">
        <div className="wrap">
          <div className="sec-tag">Workshop Content</div>
          <h2 className="mt-3 font-serif text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-tight tracking-tight">
            What you will explain in the 90-minute workshop.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {agenda.map((item, i) => (
              <Reveal key={item.time} delay={(i % 2) * 60}>
                <div className="card-base h-full p-6">
                  <div className="text-xs font-bold uppercase tracking-wide text-teal-deep">
                    {item.time}
                  </div>
                  <h3 className="mt-2 font-serif text-xl font-semibold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="wrap grid gap-10 md:grid-cols-2">
          <Reveal>
            <div className="sec-tag">Deliverables</div>
            <h2 className="mt-3 font-serif text-3xl font-bold text-navy">
              What people get from the paid workshop.
            </h2>
            <ul className="mt-6 space-y-3 text-muted">
              {deliverables.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-teal-deep">&#10003;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <div className="card-base bg-white p-7">
              <div className="sec-tag">Social Content</div>
              <h2 className="mt-2 font-serif text-2xl font-bold text-navy">
                What to post to promote it.
              </h2>
              <ul className="mt-5 space-y-3 text-sm text-muted">
                {socialIdeas.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted">
                Every post should point to either the free checklist or the
                workshop waitlist. Keep the message simple: clear customer,
                clear problem, clear offer.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
