import { useParams } from "@remix-run/react";
import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from ".";

interface LanguageSwitherContextData {
  language: string;
  slugs: {
    slug: {
      _type: string;
      current: string;
    };
    language: string;
  }[];
  setSlugs: (slugs: []) => void;
}

export const LanguageSwitcherContext =
  createContext<LanguageSwitherContextData>({
    language: "nb",
    slugs: [
      {
        slug: {
          _type: "slug",
          current: "",
        },
        language: "nb",
      },
    ],
    setSlugs: () => {},
  });

export interface LanguageSwitcherProps {
  children: React.ReactNode;
}
export default function LanguageButton() {
  const [isEnglish, setIsEnglish] = useState<boolean>(false);

  return (
    <div className="absolute top-0 right-0 m-4 text-white">
      <button
        onClick={() => setIsEnglish(false)}
        disabled={!isEnglish}
        className="mr-2"
      >
        <span className="w-6 h-6">NO</span>
      </button>
      <span className="mr-2">/</span>
      <button onClick={() => setIsEnglish(true)} disabled={isEnglish}>
        <span className="w-6 h-6">EN</span>
      </button>
    </div>
  );
}

function refreshSlug() {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const path = url.pathname;
  console.log("jeg kjører");
}

function constructURL(
  language: string,
  slugs: {
    slug: {
      _type: string;
      current: string;
    };
    language: string;
  }[]
) {
  switch (language) {
    case "nb": {
    }
  }
}

export function LanguageSwitcherProvider({ children }: LanguageSwitcherProps) {
  const [slugs, setSlugs] = useState([
    {
      slug: {
        _type: "slug",
        current: "",
      },
      language: "nb",
    },
  ]);
  const { language } = useTranslation();

  useEffect(() => {
    {
      slugs.length > 1 && refreshSlug();
    }
  }, [slugs]);
  console.log(slugs);

  return (
    <LanguageSwitcherContext.Provider value={{ slugs, language, setSlugs }}>
      <LanguageButton />
      {children}
    </LanguageSwitcherContext.Provider>
  );
}

export function useLanguageSwitcher() {
  return useContext(LanguageSwitcherContext);
}
