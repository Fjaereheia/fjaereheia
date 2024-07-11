import { Link } from "@remix-run/react";
import { useLocation } from "react-router-dom";
import BlackLogo from "./logo.svg";
import WhiteLogo from "./logo_white.svg";

export default function Header() {
  const location = useLocation();
  const frontpageUrl = ["/", "/en", "/nb"];
  const isProgramPage = location.pathname.includes("/event");
  const isEnglish = location.pathname.includes("/en/");
  return (
    <>
      {!frontpageUrl.includes(location.pathname) && (
        <div className="sticky z-10 top-0 left-0 w-12 h-12 ml-4 mt-4">
          <Link to={isEnglish ? "/en" : "/"}>
            <img src={isProgramPage ? WhiteLogo : BlackLogo} alt="Logo" />
          </Link>
        </div>
      )}
    </>
  );
}
