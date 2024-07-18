export function getBackgroundColor(colorCombination: string | undefined) {
  switch (colorCombination) {
    case "dayThemeBlueBlack":
      return "bg-dayThemeBlueBlack-primary";
    case "dayThemePeachBlue":
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
      return "dayThemeBlueBlack-secondary";
    case "dayThemePeachBlue":
      return "dayThemePeachBlu-secondary";
    case "nightThemePurpleWhite":
      return "nightThemePurpleWhite-secondary";
    case "nightThemeBlueYellow":
      return "nightThemeBlueYellow-secondary";
    default:
      return "white";
  }
}

export function getPrimaryColor(colorCombination: string | undefined) {
  switch (colorCombination) {
    case "dayThemeBlueBlack":
      return "dayThemeBlueBlack-primary";
    case "dayThemePeachBlue":
      return "dayThemePeachBlu-primary";
    case "nightThemePurpleWhite":
      return "nightThemePurpleWhite-primary";
    case "nightThemeBlueYellow":
      return "nightThemeBlueYellow-primary";
    default:
      return "white";
  }
}

export function getTextColor(colorCombination: string | undefined) {
  switch (colorCombination) {
    case "dayThemeBlueBlack":
      return "black";
    case "dayThemePeachBlue":
      return "black";
    case "nightThemePurpleWhite":
      return "white";
    case "nightThemeBlueYellow":
      return "white";
    default:
      return "black";
  }
}
