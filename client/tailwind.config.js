/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          100: "#f5e1ff", // Lighter shade
          200: "#e0bfff",
          300: "#cc99ff",
          400: "#b873ff",
          500: "#a44dff", // Base color
          600: "#8e00df", // Original custom purple
          700: "#7200b3",
          800: "#560086",
          900: "#3b005a",
        },
        primary: "#1D4ED8",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
