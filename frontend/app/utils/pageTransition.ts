import { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "@remix-run/react";

export const usePrevious = (value: string) => {
  const ref = useRef<string | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export const usePageTransition = () => {
  const location = useLocation();
  const previousLocation = usePrevious(location.pathname);

  let slideDirection = 0;

  if (previousLocation && previousLocation !== location.pathname) {
    if (location.pathname.includes("/info")) {
      if (previousLocation.includes("/artikler")) slideDirection = 1;
      else slideDirection = -1;
    } else if (location.pathname.includes("/artikler")) {
      slideDirection = -1;
    } else if (location.pathname.includes("/event")) {
      if (previousLocation.includes("/event/")) slideDirection = -1;
      else slideDirection = 1;
    } else if (location.pathname.includes("/program")) {
      if (previousLocation.includes("/event/")) slideDirection = -1;
      else slideDirection = 1;
    } else if (location.pathname === "/" || location.pathname === "/en") {
      if (
        previousLocation.includes("/info") ||
        previousLocation.includes("/artikler")
      )
        slideDirection = 1;
      else if (
        previousLocation.includes("/event") ||
        previousLocation.includes("/program")
      )
        slideDirection = -1;
    }
  }

  return { slideDirection, pathname: location.pathname };
};

export const backgroundColour: { [key: string]: string } = {
  "/": "",
  "/info": "#83D2FF",
  "/event": "#strongblue",
};
