// tailwind.config.js
import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      white: "#fff",
      black: "#000",
      richblack: {
        990: "#101010",
        900: "#1F1F20",
        800: "#2E3133",
        700: "#404245",
        600: "#4D5053",
        500: "#6F7377",
        400: "#91969B",
        300: "#C3C6CA",
        200: "#E2E2E2",
        100: "#F8F8F8",
      },
      richblue: {
        990: "#001422",
        900: "#001E32",
        800: "#002B47",
        700: "#074168",
        600: "#074168",
        500: "#0099FF",
        400: "#91CCF4",
        300: "#CAEAFF",
        200: "#E2F3FF",
        100: "#F4FBFF",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
