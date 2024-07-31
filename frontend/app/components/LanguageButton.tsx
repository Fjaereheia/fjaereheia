import { useLocation, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { createTexts, useTranslation } from "../utils/i18n";
import { useSlugContext } from "../utils/i18n/SlugProvider";

export default function LanguageButton() {
  const [isEnglish, setIsEnglish] = useState<boolean>(false);
  const params = useParams();
  const location = useLocation();
  const { t } = useTranslation();
  const blackText =
    location.pathname.includes("/artikler") ||
    location.pathname.includes("/info");
  const textColor = blackText ? "text-black" : "text-white";
  const { slug } = useSlugContext();
  useEffect(() => {
    setIsEnglish(params.lang === "en");
  }, [params]);

  async function setLanguage(lang: "NO" | "EN" | string) {
    const currentURL = window.location.href;
    const url = new URL(currentURL);
    let path = url.pathname;

    if (lang === "EN") {
      path = "/en" + path;
      setIsEnglish(true);
    } else {
      path = path.replace("/en", "");
      setIsEnglish(false);
    }

    if (path.includes("/event/")) {
      const pathSegments = path.split("/");
      if (slug) {
        pathSegments[pathSegments.length - 1] = slug;
      } else {
        pathSegments[pathSegments.length - 1] = "noSlugFound";
      }
      path = pathSegments.join("/");
    } else if (path.includes("/artikler/")) {
      const pathSegments = path.split("/");
      if (slug) {
        pathSegments[pathSegments.length - 1] = slug;
      } else {
        pathSegments[pathSegments.length - 1] = "noSlugFound";
      }
      path = pathSegments.join("/");
    }

    url.pathname = path;
    window.location.href = url.toString();
  }

  return (
    <div className={`absolute top-0 right-0 m-4 ${textColor}`}>
      <button
        onClick={() => setLanguage("NO")}
        disabled={!isEnglish}
        className="mr-2"
        aria-label={t(texts.labelTextNo)}
      >
        <span className="w-6 h-6">NO</span>
      </button>
      <span className="mr-2">/</span>
      <button
        onClick={() => setLanguage("EN")}
        disabled={isEnglish}
        aria-label={t(texts.labelTextEn)}
      >
        <span className="w-6 h-6">EN</span>
      </button>
    </div>
  );
}

const texts = createTexts({
  labelTextNo: {
    nb: "Norsk side",
    en: "Bytt språk til norsk",
  },
  labelTextEn: {
    nb: "Change language to English",
    en: "English page",
  },
});
