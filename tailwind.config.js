/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      caudex: ["Caudex", "serif"],
      poppins: ["poppins", "sans-serif"],
      play: ["Playfair Display", "serif"],
    },
    extend: {
      colors: {
        offWhite: "#faf5ec",
        green: "#28353c",
        lightGreen: "#d7e5e3",
      },
    },
  },
  plugins: [],
};
