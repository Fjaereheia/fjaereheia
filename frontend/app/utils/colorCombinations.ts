export function getBackgroundColor(colorCombination: string | undefined) {
  switch (colorCombination) {
    case "lightRedPrimaryDarkBlueSecondary":
      return "bg-lightRedPrimaryDarkBlueSecondary-primary";
    case "darkBluePrimaryGreenSecondary":
      return "bg-darkBluePrimaryGreenSecondary-primary";
    default:
      return "bg-white";
  }
}

export function getSecondaryColor(colorCombination: string | undefined) {
  switch (colorCombination) {
    case "lightRedPrimaryDarkBlueSecondary":
      return "lightRedPrimaryDarkBlueSecondary-secondary";
    case "darkBluePrimaryGreenSecondary":
      return "darkBluePrimaryGreenSecondary-secondary";
    default:
      return "bg-white";
  }
}

export function getTextColor(colorCombination: string | undefined) {
  switch (colorCombination) {
    case "lightRedPrimaryDarkBlueSecondary":
      return "text-black";
    case "darkBluePrimaryGreenSecondary":
      return "text-white";
    default:
      return "bg-black";
  }
}
