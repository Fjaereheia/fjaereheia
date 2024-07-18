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

export function getPrimaryBorderColor(colorCombination: string | undefined) {
  switch (colorCombination) {
    case "dayThemeBlueBlack":
      return "border-dayThemeBlueBlack-primary";
    case "dayThemePeachBlue":
      return "border-dayThemePeachBlue-primary";
    case "nightThemePurpleWhite":
      return "border-nightThemePurpleWhite-primary";
    case "nightThemeBlueYellow":
      return "border-nightThemeBlueYellow-primary";
    default:
      return "border-white";
  }
}

export function getPrimaryTextColor(colorCombination: string | undefined) {
  switch (colorCombination) {
    case "dayThemeBlueBlack":
      return "text-dayThemeBlueBlack-primary";
    case "dayThemePeachBlue":
      return "text-dayThemePeachBlue-primary";
    case "nightThemePurpleWhite":
      return "text-nightThemePurpleWhite-primary";
    case "nightThemeBlueYellow":
      return "text-nightThemeBlueYellow-primary";
    default:
      return "text-white";
  }
}

export function getSecondaryBackgroundColor(
  colorCombination: string | undefined
) {
  switch (colorCombination) {
    case "dayThemeBlueBlack":
      return "bg-dayThemeBlueBlack-secondary";
    case "dayThemePeachBlue":
      return "bg-dayThemePeachBlue-secondary";
    case "nightThemePurpleWhite":
      return "bg-nightThemePurpleWhite-secondary";
    case "nightThemeBlueYellow":
      return "bg-nightThemeBlueYellow-secondary";
    default:
      return "bg-white";
  }
}
export function getSecondaryBorderColor(colorCombination: string | undefined) {
  switch (colorCombination) {
    case "dayThemeBlueBlack":
      return "border-dayThemeBlueBlack-secondary";
    case "dayThemePeachBlue":
      return "border-dayThemePeachBlue-secondary";
    case "nightThemePurpleWhite":
      return "border-nightThemePurpleWhite-secondary";
    case "nightThemeBlueYellow":
      return "border-nightThemeBlueYellow-secondary";
    default:
      return "border-white";
  }
}

export function getTextColor(colorCombination: string | undefined) {
  switch (colorCombination) {
    case "dayThemeBlueBlack":
      return "text-black";
    case "dayThemePeachBlue":
      return "text-black";
    case "nightThemePurpleWhite":
      return "text-white";
    case "nightThemeBlueYellow":
      return "text-white";
    default:
      return "text-black";
  }
}

export function getTextColorBorder(colorCombination: string | undefined) {
  switch (colorCombination) {
    case "dayThemeBlueBlack":
      return "border-black";
    case "dayThemePeachBlue":
      return "border-black";
    case "nightThemePurpleWhite":
      return "border-white";
    case "nightThemeBlueYellow":
      return "border-white";
    default:
      return "border-black";
  }
}

export function getColor(colorCombination: string | undefined) {
  return {
    bgColor: getBackgroundColor(colorCombination),
    primaryBorder: getPrimaryBorderColor(colorCombination),
    primaryText: getPrimaryTextColor(colorCombination),
    secondaryBgColor: getSecondaryBackgroundColor(colorCombination),
    secondaryBorder: getSecondaryBorderColor(colorCombination),
    textColor: getTextColor(colorCombination),
    textColorBorder: getTextColorBorder(colorCombination),
  };
}
