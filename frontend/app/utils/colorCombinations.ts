export function getBackgroundColor(colorCombination: string) {
  switch (colorCombination) {
    case "lightRedPrimaryDarkBlueSecondary":
      return "bg-lightRedPrimaryDarkBlueSecondary-primary text-black";
    case "darkBluePrimaryGreenSecondary":
      return "bg-darkBluePrimaryGreenSecondary-primary text-white";
    default:
      return "";
  }
}

export function getSecondaryColor(colorCombination: string) {
  switch (colorCombination) {
    case "lightRedPrimaryDarkBlueSecondary":
      return "lightRedPrimaryDarkBlueSecondary-secondary";
    case "darkBluePrimaryGreenSecondary":
      return "darkBluePrimaryGreenSecondary-secondary";
    default:
      return "";
  }
}
