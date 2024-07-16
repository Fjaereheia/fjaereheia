export function getBackgroundColor(colorCombination: string | undefined) {
  switch (colorCombination) {
    case "lightRedPrimaryDarkBlueSecondary":
      return "#FF4D4D";
    case "darkBluePrimaryGreenSecondary":
      return "#182E39";
    default:
      return "";
  }
}

export function getSecondaryColor(colorCombination: string | undefined) {
  switch (colorCombination) {
    case "lightRedPrimaryDarkBlueSecondary":
      return "#182E39";
    case "darkBluePrimaryGreenSecondary":
      return "#D4FF26";
    default:
      return "";
  }
}
