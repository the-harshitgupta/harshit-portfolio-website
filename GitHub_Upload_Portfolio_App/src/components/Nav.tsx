"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-md transition-all ${
        scrolled
          ? "border-b border-line bg-cream/85 shadow-sm2"
          : "border-b border-transparent bg-cream/70"
      }`}
    >
      <div className="wrap flex h-[82px] items-center justify-between">
        <Link href="/" className="flex items-center" aria-label={`${site.name} home`}>
          {/* SVG wordmark keeps the header crisp on all screen sizes. */}
          <img
            src="/brand-logo.svg"
            alt={`${site.name} logo`}
            className="h-[52px] w-auto md:h-[60px]"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-[0.92rem] font-medium text-muted transition hover:text-teal-deep"
            >
              {n.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-primary whitespace-nowrap">
            Get My Free 3-Point Audit
          </Link>
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="text-2xl text-navy md:hidden"
        >
          {open ? "\u2715" : "\u2630"}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col border-b border-line bg-white py-2 shadow-soft md:hidden">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="px-6 py-3.5 font-medium text-ink"
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="btn btn-primary mx-6 my-2.5"
          >
            Get My Free 3-Point Audit
          </Link>
        </nav>
      )}
    </header>
  );
}
