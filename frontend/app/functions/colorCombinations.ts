export function getBackgroundColor(colorCombination: string | undefined) {
  switch (colorCombination) {
    case "lightRedPrimaryDarkBlueSecondary":
      return "bg-lightRedPrimaryDarkBlueSecondary-primary text-black";
    case "darkBluePrimaryGreenSecondary":
      return "bg-darkBluePrimaryGreenSecondary-primary text-white";
    default:
      return "";
  }
}

export function getSecondaryColor(colorCombination: string | undefined) {
  switch (colorCombination) {
    case "lightRedPrimaryDarkBlueSecondary":
      return "lightRedPrimaryDarkBlueSecondary-secondary";
    case "darkBluePrimaryGreenSecondary":
      return "darkBluePrimaryGreenSecondary-secondary";
    default:
      return "";
  }
}
