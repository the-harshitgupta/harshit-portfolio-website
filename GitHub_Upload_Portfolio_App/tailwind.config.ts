import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: "#0a8f96",
          deep: "#006f74",
          soft: "#e7f5f5",
        },
        navy: {
          DEFAULT: "#0b1f4c",
          soft: "#112d68",
        },
        gold: "#d79a2d",
        ink: "#142028",
        muted: "#5c6b73",
        cream: "#f7faf9",
        line: "#dde8e8",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 45px rgba(11,31,76,.10)",
        sm2: "0 8px 22px rgba(11,31,76,.08)",
      },
      borderRadius: {
        xl2: "18px",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(26px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        floaty: "floaty 5s ease-in-out infinite",
        fadeUp: "fadeUp .7s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
