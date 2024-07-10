import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  redirect,
  useLocation,
} from "@remix-run/react";
import "./styles/app.css";
import StickyFooter from "./components/StickyFooter";
import Header from "./components/Header/Header";
import PageNotFound from "./components/PageNotFound";
import { LoaderFunction } from "@remix-run/node";
import { AnimatePresence, motion } from "framer-motion";
import { useOutlet } from "react-router-dom";
import { backgroundColour, usePageTransition } from "./utils/pageTransition";

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
  return null;
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  let backgroundColorClass = "";

  switch (pathname) {
    case "/":
      backgroundColorClass = "";
      break;
    case "/info":
      backgroundColorClass = "bg-[#83D2FF]";
      break;
    case "/event":
      backgroundColorClass = "bg-newsletter";
      break;
    default:
      backgroundColorClass = "bg-gray-100";
      break;
  }

  return (
    <html lang="en">
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
  //const { pathname } = useLocation();
  const { slideDirection, pathname } = usePageTransition();

  const bg = backgroundColour[pathname] || "#F5F5F5";
  console.log(bg);
  return (
    <div className="min-h-screen flex flex-col">
      <motion.div
        key={pathname}
        initial={{
          x: slideDirection * 100 + "%",
          opacity: 0,
        }}
        animate={{ x: 0, backgroundColor: bg, opacity: 1 }}
        exit={{
          x: slideDirection * -100 + "%",
          opacity: 0,
        }}
        transition={{ type: "tween", duration: 0.7 }}
        className="flex-grow min-h-screen"
        style={{ backgroundColor: bg }}
      >
        <Header />
        <Outlet />
        <StickyFooter infoUrl="/info" programUrl="/event" />
      </motion.div>
    </div>
  );
}
