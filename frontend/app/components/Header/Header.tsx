import { Link } from "@remix-run/react";
import { useLocation } from "react-router-dom";
import BlackLogo from "./logo.svg";
import WhiteLogo from "./logo_white.svg";

export default function Header() {
  const location = useLocation();
  const frontpageUrl = ["/", "/en"];
  const isProgramPage = location.pathname.includes("/event");
  return (
    <>
      {!frontpageUrl.includes(location.pathname) && (
        <div className='sticky top-0 left-0 w-12 h-12 ml-4 mt-4'>
          <Link to='/' className={location.pathname === "/" ? "active" : ""}>
            <img src={isProgramPage ? BlackLogo : WhiteLogo} alt='Logo' />
          </Link>
        </div>
      )}
    </>
  );
}
