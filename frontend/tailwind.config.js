/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      serif: ['"PT Serif"'],
      sans: ["calibri"],
    },
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
        newsletter: "#59A1B6",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
