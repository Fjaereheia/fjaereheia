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
} from "@remix-run/react";
import "./styles/app.css";
import StickyFooter from "./components/StickyFooter";
import Header from "./components/Header/Header";
import PageNotFound from "./components/PageNotFound";
import { LoaderFunction } from "@remix-run/node";
import { motion } from "framer-motion";
import { usePageTransition } from "./utils/pageTransition";
import { getLanguageFromPath, LanguageProvider } from "./utils/i18n";
import {
  useBackgroundColor,
  BackgroundColorProvider,
} from "./utils/backgroundColor";
import { useEffect, useState } from "react";

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

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { language } = useLoaderData<typeof loader>();
  const context = useBackgroundColor();

  /*
  useEffect(() => {
    let backgroundColorClass = "";

    switch (pathname) {
      case "/":
        backgroundColorClass = "bg-black";
        break;
      case "/info":
        backgroundColorClass = "bg-[#83D2FF]";
        break;
      case "/event":
        backgroundColorClass = "bg-newsletter";
        break;
    }

    context.setColor(backgroundColorClass); //endrer ikke fargen?
  }, [pathname, context.color]);
*/
  useEffect(() => {
    console.log("root useffect: " + context.color);

    document.body.className = context.color;
  }, [context.color]);

  return (
    <html lang={language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <Meta />
        <Links />
      </head>
      <body className={context.color}>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { slideDirection, pathname } = usePageTransition();
  const { language } = useLoaderData<typeof loader>();
  const context = useBackgroundColor();

  return (
    <LanguageProvider language={language}>
      <BackgroundColorProvider
        color={context.color}
        setColor={context.setColor}
      >
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
          <Outlet />
          <StickyFooter infoUrl="/info" programUrl="/event" />
        </motion.div>
      </BackgroundColorProvider>
    </LanguageProvider>
  );
}
