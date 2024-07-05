/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { 
        lightRedPrimaryDarkBlueSecondary: {
          primary: "#FF4D4D",
          secondary: "#182E39",
        },
        darkBluePrimaryGreenSecondary: {
          primary: "#182E39",
          secondary: "#D4FF26",
        },
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
