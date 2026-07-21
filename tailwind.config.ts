import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#090909",
        gold: "#C7A14A",
        "gold-light": "#D4B366",
        "gold-dark": "#A8873A",
        white: "#FFFFFF",
        "gray-100": "#F5F5F5",
        "gray-200": "#E5E5E5",
        "gray-300": "#D4D4D4",
        "gray-400": "#A3A3A3",
        "gray-500": "#737373",
        "gray-600": "#525252",
        "gray-700": "#404040",
        "gray-800": "#262626",
        "gray-900": "#171717",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Playfair Display", "serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "slide-down": "slideDown 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.6s ease-out forwards",
        "blur-in": "blurIn 0.8s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(40px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        blurIn: {
          "0%": { filter: "blur(10px)", opacity: "0" },
          "100%": { filter: "blur(0px)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #C7A14A 0%, #D4B366 50%, #A8873A 100%)",
        "dark-gradient":
          "linear-gradient(135deg, #090909 0%, #1a1a1a 50%, #090909 100%)",
        "glass-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
