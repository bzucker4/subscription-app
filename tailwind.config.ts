import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { ink: "#27261f", paper: "#f6f3eb", moss: "#52604f", line: "#dcd7ca", sand: "#ece6d9" },
      fontFamily: { sans: ["var(--font-inter)"], serif: ["var(--font-newsreader)"] },
      boxShadow: { card: "0 18px 50px rgba(48, 43, 32, 0.07)" }
    }
  },
  plugins: []
};
export default config;
