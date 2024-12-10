const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        happyblue: {
          50: "#f1f7fa",
          100: "#dcebf1",
          200: "#bdd8e4",
          300: "#90bcd0",
          400: "#649db9",
          500: "#407b9a",
          600: "#386582",
          700: "#32546c",
          800: "#30485a",
          900: "#2c3d4d",
          950: "#192733",
        },
      },
    },
  },
  plugins: [flowbite.plugin()],
};
