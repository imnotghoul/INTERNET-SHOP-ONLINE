import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { ink: "#10100f", bone: "var(--bone)", fog: "var(--fog)", acid: "#dfff00" },
      fontFamily: { sans: ["Inter", "Helvetica Neue", "Arial", "sans-serif"], display: ["Arial Black", "Helvetica Neue", "Arial", "sans-serif"] },
      letterSpacing: { tightest: "-.06em" },
    },
  },
  plugins: [],
} satisfies Config;
