"use client";

import dynamic from "next/dynamic";

const Hero3D = dynamic(() => import("@/components/Hero3D"), {
  ssr: false,
  loading: () => (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, rgba(10,143,150,.12), transparent 32%), radial-gradient(circle at 80% 40%, rgba(216,178,74,.10), transparent 28%)",
      }}
      aria-hidden="true"
    />
  ),
});

export default function LazyHero3D() {
  return <Hero3D />;
}
