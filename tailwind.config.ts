import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: "var(--font-inter)",
        geist: "var(--font-geist-mono)",
        google: "var(--font-google)",
        redhat: "var(--font-redhat-display)",
      },
    },
  },
  plugins: [],
};
export default config;