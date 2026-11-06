import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Hind Siliguri", "Noto Sans Bengali", "system-ui", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: { marquee: "marquee 70s linear infinite" },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        bazar: {
          primary: "#0d9a2c",
          "primary-content": "#ffffff",
          secondary: "#e7f3e8",
          accent: "#0d9a2c",
          neutral: "#1f2a1f",
          "base-100": "#ffffff",
          "base-200": "#eef6ef",
          "base-300": "#d9e8db",
          "base-content": "#1b261c",
          info: "#2563eb",
          success: "#15a34a",
          warning: "#f59e0b",
          error: "#dc2626",
          "--rounded-box": "0.75rem",
          "--rounded-btn": "0.5rem",
        },
      },
    ],
    logs: false,
  },
};
export default config;
