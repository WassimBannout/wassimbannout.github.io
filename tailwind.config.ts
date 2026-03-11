import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#060606",
        surface: "#0d0d0d",
        fg: "#e8e8e8",
        muted: "#4a4a4a",
        subtle: "#2a2a2a",
        accent: "#a78bfa",
        "accent-dim": "#7c3aed",
        cyan: "#22d3ee",
        line: "#1a1a1a",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
