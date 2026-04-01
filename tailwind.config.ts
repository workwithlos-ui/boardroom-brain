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
        navy: {
          DEFAULT: "#0A1628",
          50: "#0E1E38",
          100: "#0C1A30",
          200: "#0A1628",
          300: "#081220",
          400: "#060E18",
          500: "#040A10",
          600: "#152240",
          700: "#1A2D52",
          800: "#203864",
          900: "#264376",
        },
        gold: {
          DEFAULT: "#C9952A",
          50: "#FDF8ED",
          100: "#F9EDCF",
          200: "#F0D89E",
          300: "#E7C36D",
          400: "#D9AC44",
          500: "#C9952A",
          600: "#A67A22",
          700: "#835F1A",
          800: "#604513",
          900: "#3D2C0C",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
