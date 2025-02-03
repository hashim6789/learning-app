/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      blue: {
        50: "#e9efff",
        100: "#c9d8ff",
        200: "#99b3ff",
        300: "#547cff",
        400: "#0735ff",
        500: "#001eef",
        600: "#000fc9",
        700: "#000ba1",
        800: "#080e82",
        900: "#0c0d6d",
        950: "#000001",
      },

      colors: {
        red: {
          50: "#ffeeee",
          100: "#ffdada",
          200: "#ffbbbb",
          300: "#ff8b8c",
          400: "#ff494a",
          500: "#ff1113",
          600: "#ff0002",
          700: "#e70002",
          800: "#be0001",
          900: "#8b0001",
          950: "#560001",
        },

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
