import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4A9EDB",
        "primary-light": "#EAF4FF",
        "primary-wash": "#F0F8FF",
        gold: "#C9A84C",
        "gold-light": "#FBF5E6",
        "health-green": "#2D9B6F",
        "green-light": "#E8F5EF",
        "near-black": "#1A1D23",
        "text-body": "#4A5568",
        "text-muted": "#8A94A6",
        surface: "#F8F9FC",
        card: "#FFFFFF",
        border: "#E8EBF0",
        emergency: "#D94F3D",
        "emergency-light": "#FEF2F1",
      },
      fontFamily: {
        sans: ["var(--font-outfit)"],
        serif: ["var(--font-playfair)"],
        accent: ["var(--font-cormorant)"],
      },
    },
  },
  plugins: [],
};

export default config;
