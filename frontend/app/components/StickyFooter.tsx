import { Link, useLocation } from "@remix-run/react";

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

  if (!showFooter) {
    return null;
  }

  if (location.pathname.includes("/event")) {
    textcolor = "white";
    bgcolor = "newsletter";
  }

  if (location.pathname === "/info") {
    textcolor = "black";
    bgcolor = "[#83D2FF]";
  }

  return (
    <footer
      className={`sticky bottom-0 border-t text-${textcolor} bg-${bgcolor} font-serif text-2xl border-${textcolor} shadow py-2  z-10 h-[7vh] lg:h-[5vh]`}
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
