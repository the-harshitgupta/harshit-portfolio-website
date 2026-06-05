import type { Metadata } from "next";
import Link from "next/link";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free ICP Clarity Checklist",
  description:
    "Download a free beginner-friendly ICP checklist to define your best customer, customer pains, positioning, and 7-day marketing action plan.",
  alternates: { canonical: `${site.url}/resources/icp-checklist` },
};

const steps = [
  "Choose one clear customer segment.",
  "Write the painful problem they want solved.",
  "Find where they spend time online.",
  "Collect real customer words from comments, reviews, and competitor pages.",
  "Write why your offer is different.",
  "Create your simple ICP statement.",
  "Turn it into a 7-day marketing action plan.",
];

export default function IcpChecklistPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    name: "Free ICP Clarity Checklist",
    description: metadata.description,
    url: `${site.url}/resources/icp-checklist`,
    author: { "@type": "Person", name: site.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-16">
        <div className="wrap grid gap-10 md:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <Link
              href="/"
              className="text-sm font-semibold text-teal-deep hover:underline"
            >
              &#8592; Back to home
            </Link>
            <div className="mt-8 sec-tag">Free Resource</div>
            <h1 className="mt-3 font-serif text-[clamp(2.1rem,4.8vw,3.5rem)] font-bold leading-tight tracking-tight">
              Free ICP Clarity Checklist
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              If you are new to marketing, start here. This checklist helps you
              understand who your best customer is, what problem they care
              about, and how to speak to them clearly.
            </p>

            <div className="card-base mt-8 bg-white p-6">
              <h2 className="font-serif text-xl font-bold text-navy">
                You will learn how to:
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {steps.map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-teal-soft text-xs font-bold text-teal-deep">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["Time", "30-45 minutes"],
                ["Level", "Beginner"],
                ["Outcome", "Clear ICP statement"],
              ].map(([label, value]) => (
                <div key={label} className="card-base bg-white p-4">
                  <div className="text-xs font-bold uppercase tracking-wide text-teal-deep">
                    {label}
                  </div>
                  <div className="mt-1 font-semibold text-navy">{value}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <LeadMagnetForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
