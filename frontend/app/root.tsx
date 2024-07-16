import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  redirect,
  useLocation,
  json,
  useLoaderData,
  useRouteLoaderData,
} from "@remix-run/react";
import "./styles/app.css";
import StickyFooter from "./components/StickyFooter";
import Header from "./components/Header/Header";
import PageNotFound from "./components/PageNotFound";
import { LoaderFunction } from "@remix-run/node";
import { motion } from "framer-motion";
import { usePageTransition } from "./utils/pageTransition";
import { getLanguageFromPath, LanguageProvider } from "./utils/i18n";
import LanguageButton from "./components/LanguageButton";
import { useContext, useEffect, useMemo, useState } from "react";
import { BackgroundColorContext } from "./BackgroundColorContext";
import { getBackgroundColor } from "./utils/colorCombinations";

type ErrorWithStatus = {
  status?: number;
  statusText?: string;
};

export function ErrorBoundary() {
  const error = useRouteError() as ErrorWithStatus;
  console.debug(error);

  return (
    <>
      <title>404 - OPS</title>
      {error?.status === 404 ? (
        <PageNotFound />
      ) : (
        <div>
          <h1>Something went wrong</h1>
          <p>Sorry, an unexpected error has occurred.</p>
        </div>
      )}
    </>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const { pathname, search } = new URL(request.url);

  if (pathname.endsWith("/") && pathname.length > 1) {
    throw redirect(`${pathname.slice(0, -1)}${search}`, 301);
  }

  const language = getLanguageFromPath(pathname);
  return json({ language });
};

const getBackgroundColorBasedOnRoute = (pathname: string) => {
  switch (pathname) {
    case "/" || "/en":
      return "";
    case "/info":
    case "/en/info":
      return "bg-[#83D2FF]";
    case "/event":
      return "bg-newsletter";
    case "/en/event":
      return "bg-newsletter";
    default:
      return "";
  }
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { language } = useRouteLoaderData<typeof loader>("root");
  const { color, setColor } = useContext(BackgroundColorContext);
  const { pathname } = useLocation();

  useEffect(() => {
    let newColor = getBackgroundColorBasedOnRoute(pathname);
    if (newColor.length > 0) {
      setColor(newColor);
    }
  }, [pathname]);

  return (
    <html lang={language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <Meta />
        <Links />
      </head>
      <body className={color}>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { slideDirection, pathname } = usePageTransition();
  const { language } = useRouteLoaderData<typeof loader>("root");

  const [color, setColor] = useState("bg-white");

  const value = { color, setColor };

  useEffect(() => {
    document.body.className = color;
  }, [setColor, color]);

  return (
    <LanguageProvider language={language}>
      <BackgroundColorContext.Provider value={value}>
        <motion.div
          key={pathname}
          initial={{ x: slideDirection * 100 + "%" }}
          animate={{ x: 0 }}
          exit={{
            x: slideDirection * -100 + "%",
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <Header />
          <LanguageButton />
          <Outlet />
          <StickyFooter infoUrl={"/info"} programUrl={"/event"} />
        </motion.div>
      </BackgroundColorContext.Provider>
    </LanguageProvider>
  );
}
