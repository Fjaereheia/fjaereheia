import {
  COLORCOMBINATION,
  ColorCombination,
} from "../../../cms/schemaTypes/objects/colorCombination";

function getColorProperty<T extends keyof ColorCombination>(
  colorCombination: string | undefined,
  property: T
): ColorCombination[T] | string {
  const theme = COLORCOMBINATION.find(
    (theme) => theme.value === colorCombination
  );
  return theme ? theme[property] : "default-value";
}

export function getBackgroundColor(
  colorCombination: string | undefined
): string {
  return getColorProperty(colorCombination, "primaryBg") || "bg-white";
}

export function getPrimaryBorderColor(
  colorCombination: string | undefined
): string {
  return getColorProperty(colorCombination, "primaryBorder") || "border-white";
}

export function getPrimaryTextColor(
  colorCombination: string | undefined
): string {
  return getColorProperty(colorCombination, "primaryText") || "text-white";
}

export function getSecondaryBackgroundColor(
  colorCombination: string | undefined
): string {
  return getColorProperty(colorCombination, "secondaryBg") || "bg-white";
}

export function getSecondaryBorderColor(
  colorCombination: string | undefined
): string {
  return (
    getColorProperty(colorCombination, "secondaryBorder") || "border-white"
  );
}

export function getTextColor(colorCombination: string | undefined): string {
  return getColorProperty(colorCombination, "text") || "text-black";
}

export function getTextColorBorder(
  colorCombination: string | undefined
): string {
  return getColorProperty(colorCombination, "textBorder") || "border-black";
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
