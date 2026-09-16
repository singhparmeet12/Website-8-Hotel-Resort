import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        marea: {
          teal: {
            DEFAULT: "#0F3D3E",
            deep: "#0B2E2F",
            dark: "#0A2426",
            night: "#061819",
            light: "#175759",
            surface: "#114647",
            soft: "#E8F0F0",
          },
          gold: {
            DEFAULT: "#C9A45C",
            hover: "#B59149",
            light: "#E3C582",
            glow: "#F0D89F",
            muted: "rgba(201, 164, 92, 0.2)",
            subtle: "#FAF5EA",
          },
          sand: {
            DEFAULT: "#F3E9DA",
            light: "#FBF7F1",
            card: "#F8F1E7",
            border: "#E7DAC7",
            dark: "#E1D0B8",
          },
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-jost)", "Jost", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'gold-subtle': '0 4px 20px -2px rgba(201, 164, 92, 0.25)',
        'gold-glow': '0 0 25px 2px rgba(201, 164, 92, 0.35)',
        'teal-deep': '0 10px 40px -10px rgba(10, 36, 38, 0.5)',
        'float': '0 20px 45px -10px rgba(7, 25, 26, 0.35)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'ken-burns': 'kenburns 20s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float-gentle': 'floatGentle 4s ease-in-out infinite',
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
