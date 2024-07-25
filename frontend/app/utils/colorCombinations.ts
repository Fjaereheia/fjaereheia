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

export function getPortabletextStyle(colorCombination: string | undefined) {
  switch (colorCombination) {
    case "dayThemeBlueBlack":
      return "prose-h1:text-black prose-h2:text-dayThemeBlueBlack-secondary text-black";
    case "dayThemePeachBlue":
      return "prose-h1:text-black prose-h2:text-dayThemePeachBlue-secondary text-black";
    case "nightThemePurpleWhite":
      return "prose-h1:text-white prose-h2:text-nightThemePurpleWhite-secondary text-white";
    case "nightThemeBlueYellow":
      return "prose-h1:text-white prose-h2:text-nightThemeBlueYellow-secondary text-white";
    default:
      return "prose-h1:text-black prose-h2:text-black text-black";
  }
}

export function getQuoteStyle(colorCombination: string | undefined) {
  switch (colorCombination) {
    case "dayThemeBlueBlack":
      return {
        styleBlock:
          "border-none grid grid-flow-row place-items-center text-center text-black",
        styleLink: "not-italic text-black",
        fillColor: "#000000",
      };
    case "dayThemePeachBlue":
      return {
        styleBlock:
          "border-none grid grid-flow-row place-items-center text-center text-black",
        styleLink: "not-italic text-black",
        fillColor: "#000000",
      };
    case "nightThemePurpleWhite":
      return {
        styleBlock:
          "border-none grid grid-flow-row place-items-center text-center text-white",
        styleLink: "not-italic text-white",
        fillColor: "#FFFFFF",
      };
    case "nightThemeBlueYellow":
      return {
        styleBlock:
          "border-none grid grid-flow-row place-items-center text-center text-white",
        styleLink: "not-italic text-white",
        fillColor: "#FFFFFF",
      };
    default:
      return {
        styleBlock:
          "border-none grid grid-flow-row place-items-center text-center text-black",
        styleLink: "not-italic text-black",
        fillColor: "#000000",
      };
  }
}

export function getColor(colorCombination: string | undefined) {
  const quoteStyle = getQuoteStyle(colorCombination);
  return {
    bgColor: getBackgroundColor(colorCombination),
    primaryBorder: getPrimaryBorderColor(colorCombination),
    primaryText: getPrimaryTextColor(colorCombination),
    secondaryBgColor: getSecondaryBackgroundColor(colorCombination),
    secondaryBorder: getSecondaryBorderColor(colorCombination),
    textColor: getTextColor(colorCombination),
    textColorBorder: getTextColorBorder(colorCombination),
    portabletextStyle: getPortabletextStyle(colorCombination),
    quoteStyle,
  };
}
