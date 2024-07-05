import { Link } from "@remix-run/react";
import { useLocation } from "@remix-run/react";

interface ButtonProps {
  url: string;
  buttonText: string;
}

export default function Button({ url, buttonText }: ButtonProps) {
  const location = useLocation();
  const isHomepage = location.pathname === "/";

  const buttonClass = isHomepage
    ? " text-white px-4 py-2 rounded self-center font-serif text-2xl lg:text-4xl "
    : "";

  return (
    <Link to={url}>
      <button className={buttonClass}>{buttonText}</button>
    </Link>
  );
}
