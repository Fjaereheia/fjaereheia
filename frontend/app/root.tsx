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
import { useEffect } from "react";

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

  const newPathname = pathname.replace(/\/nb/g, "");

  if (newPathname !== pathname) {
    throw redirect(`${newPathname}${search}`, 301);
  }

  if (pathname.endsWith("/") && pathname.length > 1) {
    throw redirect(`${pathname.slice(0, -1)}${search}`, 301);
  }

  const language = getLanguageFromPath(pathname);
  return json({ language });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { language } = useRouteLoaderData<typeof loader>("root");

  useEffect(() => {
    const logHeight = () => {
      console.log("body height:", document.body.clientHeight);
      const motionContainer = document.querySelector(".motion-container");
      if (motionContainer) {
        console.log(".motion-container height:", motionContainer.clientHeight);
      }
    };

    logHeight(); // Log height on mount
    window.addEventListener("resize", logHeight); // Log height on resize
    return () => window.removeEventListener("resize", logHeight); // Cleanup on unmount
  }, [pathname]); // Run effect on pathname change

  let backgroundColorClass = "";

  switch (pathname) {
    case "/" || "/en":
      backgroundColorClass = "";
      break;
    case "/info":
    case "/en/info":
      backgroundColorClass = "bg-[#83D2FF]";
      break;
    case "/event":
    case "/en/event":
      backgroundColorClass = "bg-newsletter";
      break;
    default:
      backgroundColorClass = "bg-gray-100";
      break;
  }

  return (
    <html lang={language} style={{ height: "100%" }}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <Meta />
        <Links />
      </head>
      <body className={backgroundColorClass}>
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
  return (
    <LanguageProvider language={language}>
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
    </LanguageProvider>
  );
}
