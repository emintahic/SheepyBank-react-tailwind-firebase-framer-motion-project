/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      zelena: {
        100: "#b1c1a7",
        200: "#a6bf97",
        300: "#9dbd8a",
        400: "#8fbb75",
        500: "#85bb65",
        600: "#76a958",
        800: "#608c46",
        900: "#476933",
      },
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      green: colors.green,
    },

    extend: {},
  },
  mode: "jit",
  purge: "",
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar-hide"),
    require("daisyui"),
  ],
};
