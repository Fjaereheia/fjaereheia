import { Link } from "@remix-run/react";

interface StickyFooterProps {
  programUrl: string;
  infoUrl: string;
}

export default function StickyFooter({
  programUrl,
  infoUrl,
}: StickyFooterProps) {
  return (
    <footer className="sticky bottom-0 border-t border-gray-200 shadow">
      <ul className="flex flex-row justify-center">
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
