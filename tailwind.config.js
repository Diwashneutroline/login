/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        man: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        caveat: ["Caveat", "cursive"],
        marker: ["Permanent Marker", "cursive"],
        kablammo: ["Kablammo", "cursive"],
        flower: ["Indie Flower", "cursive"],
      },
      boxShadow: {
        shado2: "0px 2px 8px 0px rgba(149, 157, 165, 0.2)",
      },
    },
  },
  plugins: [],
};
