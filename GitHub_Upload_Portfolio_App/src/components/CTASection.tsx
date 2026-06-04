import Link from "next/link";
import Reveal from "./Reveal";

export default function CTASection() {
  return (
    <section className="py-24">
      <div className="wrap">
        <Reveal className="overflow-hidden rounded-[28px] bg-gradient-to-br from-navy to-navy-soft px-8 py-16 text-center text-white shadow-soft md:px-16">
          <div className="sec-tag !text-gold">Let&apos;s Talk</div>
          <h2 className="mx-auto mt-3 max-w-2xl font-serif text-[clamp(1.8rem,3vw,2.6rem)] font-bold">
            Not sure what your marketing is missing? Find out for free.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#c7d2ea]">
            Request a free 3-point audit: one positioning gap, one funnel issue,
            and one growth opportunity, specific to your business.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="btn bg-white text-navy hover:-translate-y-0.5"
            >
              Request a Free Audit
            </Link>
            <Link
              href="/work"
              className="btn border-[1.5px] border-white/40 text-white hover:bg-white/10"
            >
              See Sample Work
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
