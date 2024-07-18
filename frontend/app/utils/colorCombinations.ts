export function getBackgroundColor(colorCombination: string | undefined) {
  switch (colorCombination) {
    case "dayThemeBlueBlack":
      return "bg-dayThemeBlueBlack-primary";
    case "dayThemePeachBlu":
      return "bg-dayThemePeachBlue-primary";
    case "nightThemePurpleWhite":
      return "bg-nightThemePurpleWhite-primary";
    case "nightThemeBlueYellow":
      return "bg-nightThemeBlueYellow-primary";
    default:
      return "bg-white";
  }
}

export function getSecondaryColor(colorCombination: string | undefined) {
  switch (colorCombination) {
    case "dayThemeBlueBlack":
      return "bg-dayThemeBlueBlack-secondary";
    case "dayThemePeachBlu":
      return "dayThemePeachBlu-secondary";
    case "nightThemePurpleWhite":
      return "bg-nightThemePurpleWhite-secondary";
    case "nightThemeBlueYellow":
      return "bg-nightThemeBlueYellow-secondary";
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
