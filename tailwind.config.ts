import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ebo: {
          green: "#009900",
          "green-dark": "#006600",
          "green-light": "#33cc33",
          lime: "#ccff00",
          "lime-soft": "#e6ff66",
          black: "#0a0a0a",
          white: "#ffffff",
        },
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.03", transform: "scale(1)" },
          "50%": { opacity: "0.06", transform: "scale(1.1)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
