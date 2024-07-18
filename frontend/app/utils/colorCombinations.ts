export function getBackgroundColor(colorCombination: string | undefined) {
  if (colorCombination) {
    const style = "bg-" + colorCombination + "-primary";
    return style;
  } else {
    return "bg-white";
  }
}

export function getPrimaryBorderColor(colorCombination: string | undefined) {
  if (colorCombination) {
    const style = "border-" + colorCombination + "-primary";
    return style;
  } else {
    return "border-white";
  }
}

export function getPrimaryTextColor(colorCombination: string | undefined) {
  if (colorCombination) {
    const style = "text-" + colorCombination + "-primary";
    return style;
  } else {
    return "text-white";
  }
}

export function getSecondaryBackgroundColor(
  colorCombination: string | undefined
) {
  if (colorCombination) {
    const style = "bg-" + colorCombination + "-secondary";
    return style;
  } else {
    return "bg-white";
  }
}

export function getSecondaryBorderColor(colorCombination: string | undefined) {
  if (colorCombination) {
    const style = "border-" + colorCombination + "-secondary";
    return style;
  } else {
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
