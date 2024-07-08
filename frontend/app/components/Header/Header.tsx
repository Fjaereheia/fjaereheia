import { Link } from "@remix-run/react";
import { useLocation } from "react-router-dom";
import BlackLogo from "./logo.svg";
import WhiteLogo from "./logo_white.svg";
import i18nn from "~/i18n";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Header() {
  const location = useLocation();
  const frontpageUrl = ["/", "/en"];
  const isProgramPage = location.pathname.includes("/event");
  const isEnglish = location.pathname.includes("/en/");
  let { i18n } = useTranslation();
  const [displayLanguages, setDisplayLanguages] = useState(false);
  const supportedLanguages = i18nn.supportedLngs;

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      {!frontpageUrl.includes(location.pathname) && (
        <div className="sticky flex justify-between top-0 left-0 h-12 ml-4 mt-4">
          <Link to={isEnglish ? "/en" : "/"}>
            <img src={isProgramPage ? BlackLogo : WhiteLogo} alt="Logo" />
          </Link>
          <div className="flex ">
            {displayLanguages && (
              <div className="flex justify-center">
                {supportedLanguages.map((language: string, index: number) => {
                  return (
                    <div key={index} className="flex justify-center">
                      <button
                        onClick={() => changeLanguage(language)}
                        className={
                          index != supportedLanguages.length - 1
                            ? "my-2 px-3 border-r-2"
                            : "my-2 px-3"
                        }
                      >
                        {language}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
            <button onClick={() => setDisplayLanguages(!displayLanguages)}>
              <img
                src={
                  isProgramPage
                    ? "../public/earth-black.svg"
                    : "../public/earth-white.svg"
                }
                alt="Logo"
                className="w-8"
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
