export function getImageMask(imageMask: string | undefined) {
  switch (imageMask) {
    case "smallImageNotCoveringScreen":
      return "smallImageMask";
    case "bigImageCoveringScreen":
      return "bigImageMask";
    default:
      return "";
  }
}
