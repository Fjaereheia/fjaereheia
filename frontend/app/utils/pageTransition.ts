import { useRef, useEffect } from "react";
import { useLocation } from "@remix-run/react";

export const usePrevious = (value: string) => {
  const ref = useRef<string | undefined>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const usePageTransition = () => {
  const location = useLocation();
  const previousLocation = usePrevious(location.pathname);

  let slideDirection = 0;

  if (location.pathname.includes("/info")) {
    if (previousLocation?.includes("/artikler")) slideDirection = 1;
    else slideDirection = -1;
  } else if (location.pathname.includes("/artikler")) {
    slideDirection = -1;
  } else if (location.pathname.includes("/event")) {
    if (previousLocation?.includes("/event/")) slideDirection = -1;
    else slideDirection = 1;
  } else if (location.pathname === "/" || location.pathname === "/en") {
    if (
      previousLocation?.includes("/info") ||
      previousLocation?.includes("/artikler")
    )
      slideDirection = 1;
    else if (previousLocation?.includes("/event")) slideDirection = -1;
    else slideDirection = 0;
  } else slideDirection = 0;

  return { slideDirection, pathname: location.pathname };
};

export const backgroundColour: { [key: string]: string } = {
  "/": "",
  "/info": "#83D2FF",
  "/event": "#newsletter",
};
