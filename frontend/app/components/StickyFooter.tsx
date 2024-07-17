import { Link, useLocation } from "@remix-run/react";
import { useBackgroundColor } from "~/utils/backgroundColor";

interface StickyFooterProps {
  programUrl: string;
  infoUrl: string;
}

export default function StickyFooter({
  programUrl,
  infoUrl,
}: StickyFooterProps) {
  let textcolor = "black";
  let bgcolor = "white";
  const location = useLocation();
  const isEnglish =
    location.pathname.includes("/en/") || location.pathname === "/en";
  const showFooter = !["/", "/en"].includes(location.pathname);
  const { color } = useBackgroundColor();

  if (!showFooter) {
    return null;
  }

  if (location.pathname.includes("/event")) {
    textcolor = "white";
    bgcolor = "newsletter";
  }

  if (location.pathname.includes("/info")) {
    textcolor = "black";
    bgcolor = "[#83D2FF]";
  }
  if (location.pathname.includes("/artikler")) {
    textcolor = "black";
    bgcolor = "gray-100";
  }

  return (
    <footer
      className={`sticky bottom-0 border-t text-${textcolor} ${color} font-serif text-2xl border-${textcolor} shadow py-2  z-10 h-[7vh] lg:h-[5vh]`}
    >
      <ul className="flex flex-row justify-evenly lg:justify-center">
        <li>
          <Link
            to={isEnglish ? "/en" + infoUrl : infoUrl}
            className="hover:underline me-4 md:me-6 w-1/2 "
          >
            INFO
          </Link>
        </li>
        <li>
          <Link
            to={isEnglish ? "/en" + programUrl : programUrl}
            className="hover:underline me-4 md:me-6 w-1/2"
          >
            PROGRAM
          </Link>
        </li>
      </ul>
    </footer>
  );
}
