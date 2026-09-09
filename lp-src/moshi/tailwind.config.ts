import type { Config } from "tailwindcss";

/**
 * 模試LPの配色（ネイビー基調）。
 * 漫画LP（lp-src/manga）はWAGONピンク #F45D9B ＋ クリーム地なので、
 * こちらは濃紺 #274B7A ＋ 寒色のごく淡い地で区別します。
 * アクセントは淡い金（#FDF6E3 / #D4A62A）。ネイビーだけだと沈むので、
 * 転換部分（希望・注記・アイコン地）にだけ温度を足す役割です。
 * LINEの緑（#06C755）はブランド指定色なので触りません。
 */
const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wagon: {
          50: "#EEF2F8",
          100: "#DBE3EF",
          200: "#B4C3DC",
          300: "#8399BE",
          400: "#4E6C9B",
          500: "#274B7A",
          600: "#1B3A61",
          700: "#122946",
        },
        /** 申込CTA専用のピンク。ネイビーの中でここだけが「押す場所」 */
        cta: {
          400: "#F06AA5",
          500: "#D6357A",
          600: "#B72864",
          700: "#96204F",
        },
        accent: {
          100: "#FDF6E3",
          200: "#F8E9C2",
          300: "#E9CE86",
          400: "#D4A62A",
        },
        cream: "#F5F7FA",
        ink: "#12243A",
        inkSoft: "#4A5A70",
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
        soft: "0 8px 30px -12px rgba(39, 75, 122, 0.35)",
        card: "0 4px 20px -8px rgba(18, 36, 58, 0.16)",
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
