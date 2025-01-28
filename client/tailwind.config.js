/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      blue: {
        50: "#e4f5ff",
        100: "#cfebff",
        200: "#a8d8ff",
        300: "#74bcff",
        400: "#3e8dff",
        500: "#135dff",
        600: "#0049ff",
        700: "#0049ff",
        800: "#0042e4",
        900: "#002db0",
        950: "#001047",
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
