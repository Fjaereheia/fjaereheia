import { useRef, useEffect } from "react";
import { useLocation } from "@remix-run/react";

export const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const usePageTransition = () => {
  const location = useLocation();
  const previousLocation = usePrevious(location.pathname);

  let slideDirection = 0;

  switch (location.pathname) {
    case "/info":
      slideDirection = previousLocation == "/info" ? 1 : -1;
      break;
    case "/event":
      slideDirection = previousLocation == "/event" ? -1 : 1;
      break;
    case "/program":
      slideDirection = previousLocation == "/event" ? -1 : 1;
      break;
    default:
      slideDirection = previousLocation == "/event" ? -1 : 1;
      break;
  }

  return { slideDirection, pathname: location.pathname };
};

export const backgroundColour: { [key: string]: string } = {
  "/": "",
  "/info": "#83D2FF",
  "/event": "#newsletter",
};
