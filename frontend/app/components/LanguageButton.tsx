import { useEffect, useState } from "react";

export default function LanguageButton() {
  const [isEnglish, setIsEnglish] = useState<boolean>(false);

  useEffect(() => {
    const checkLanguage = () => {
      const currentURL = window.location.href;
      const url = new URL(currentURL);
      let path = url.pathname;
      setIsEnglish(path.startsWith("/en" || "/en/"));
    };

    checkLanguage();
  }, []);

  function setLanguage(lang: "NO" | "EN" | string) {
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

    url.pathname = path;
    window.location.href = url.toString();
  }

  return (
    <div className="absolute top-0 right-0 m-4 text-white">
      <button
        onClick={() => setLanguage("NO")}
        disabled={!isEnglish}
        className="mr-2"
      >
        <span className="w-6 h-6">NO</span>
      </button>
      <span className="mr-2">/</span>
      <button onClick={() => setLanguage("EN")} disabled={isEnglish}>
        <span className="w-6 h-6">EN</span>
      </button>
    </div>
  );
}
