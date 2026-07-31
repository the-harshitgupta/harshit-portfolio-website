"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Hero3D = dynamic(() => import("@/components/Hero3D"), { ssr: false });

const Backdrop = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0"
    style={{
      background:
        "radial-gradient(circle at 20% 20%, rgba(10,143,150,.12), transparent 32%), radial-gradient(circle at 80% 40%, rgba(216,178,74,.10), transparent 28%)",
    }}
    aria-hidden="true"
  />
);

export default function LazyHero3D() {
  // Hero3D already refuses to render below 760px, but the Three.js chunk was
  // still being downloaded and parsed on every phone. Gate the import itself so
  // mobile never pays for it, and skip it entirely for reduced-motion users.
  const [enable3D, setEnable3D] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 760px)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (wide && !calm) setEnable3D(true);
  }, []);

  if (!enable3D) return <Backdrop />;
  return <Hero3D />;
}
