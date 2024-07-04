import { Link, useLocation } from "@remix-run/react";

interface StickyFooterProps {
  programUrl: string;
  infoUrl: string;
}

export default function StickyFooter({
  programUrl,
  infoUrl,
}: StickyFooterProps) {
  const location = useLocation();
  const showFooter = !["/", "/en"].includes(location.pathname);

  if (!showFooter) {
    return null;
  }
  return (
    <footer className="sticky bottom-0 border-t border-gray-200 shadow py-2 bg-white bg-opacity-100 z-10">
      <ul className="flex flex-row justify-center space-x-6">
        <li>
          <Link
            to={infoUrl}
            className="hover:underline me-4 md:me-6 hover:text-gray-400"
          >
            INFO
          </Link>
        </li>
        <li>
          <Link
            to={programUrl}
            className="hover:underline me-4 md:me-6 hover:text-gray-400"
          >
            PROGRAM
          </Link>
        </li>
      </ul>
    </footer>
  );
}
