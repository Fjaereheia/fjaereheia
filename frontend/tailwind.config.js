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
        dayThemeBlueBlack: {
          primary: "#B6E3FD",
          secondary: "black",
        },
        dayThemePeachBlue: {
          primary: "#FFD3CE",
          secondary: "#350E94",
        },
        nightThemePurpleWhite: {
          primary: "#556090",
          secondary: "white",
        },
        nightThemeBlueYellow: {
          primary: "#182E39",
          secondary: "#D4FF26",
        },
        newsletter: "#59A1B6",
        lightblue: "#83D2FF",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
