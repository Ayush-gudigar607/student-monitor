import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        slateInk: "#0F172A",
        cloud: "#F8FAFC",
        accent: "#0F766E",
        amberGlow: "#F59E0B",
        roseSoft: "#FB7185",
        steel: "#475569",
        panel: "rgba(255,255,255,0.7)",
      },
      boxShadow: {
        panel: "0 20px 45px rgba(15, 23, 42, 0.08)",
      },
      backgroundImage: {
        grid: "radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.08) 1px, transparent 0)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
