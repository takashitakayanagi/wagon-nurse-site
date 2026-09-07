import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wagon: {
          50: "#FFF4F8",
          100: "#FFE6F0",
          200: "#FFC9DF",
          300: "#FFA6CA",
          400: "#FB84B4",
          500: "#F45D9B",
          600: "#E23F82",
          700: "#BE2F68",
        },
        accent: {
          100: "#FFF9E3",
          200: "#FFF1BF",
          300: "#FFE68A",
          400: "#FFD84D",
        },
        cream: "#FFFDF7",
        ink: "#4A3B34",
        inkSoft: "#7A6A62",
        line: {
          DEFAULT: "#06C755",
          dark: "#05A648",
        },
      },
      maxWidth: {
        container: "1120px",
      },
      borderRadius: {
        card: "1.25rem",
      },
      boxShadow: {
        soft: "0 8px 30px -12px rgba(244, 93, 155, 0.25)",
        card: "0 4px 20px -8px rgba(74, 59, 52, 0.15)",
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "Hiragino Kaku Gothic ProN",
          "Hiragino Sans",
          "Meiryo",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
