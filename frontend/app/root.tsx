import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  redirect,
  useRouteLoaderData,
} from "@remix-run/react";
import "./styles/app.css";
import StickyFooter from "./components/StickyFooter";
import Header from "./components/Header/Header";
import PageNotFound from "./components/PageNotFound";
import { LoaderFunction } from "@remix-run/node";
import { motion } from "framer-motion";
import { usePageTransition } from "./utils/pageTransition";
import {
  getLanguageFromPath,
  LanguageProvider,
  useTranslation,
} from "./utils/i18n";
import {
  BackgroundColorProvider,
  useBackgroundColor,
} from "./utils/backgroundColor";
import LanguageButton from "./components/LanguageButton";
import { SlugProvider } from "./utils/i18n/SlugProvider";
import NoTranslation from "./components/NoTranslation";
import { lazy, Suspense } from "react";

const LiveVisualEditing = lazy(() => import("./components/LiveVisualEditing"));

type ErrorWithStatus = {
  status?: number;
  statusText?: string;
  data: string;
};

export function ErrorBoundary() {
  const error = useRouteError() as ErrorWithStatus;
  console.error(error);

  function ErrorSwitcher() {
    if (error.data == "No translation found") {
      return <NoTranslation />;
    } else {
      return <PageNotFound />;
    }
  }
  return (
    <>
      <title>404 - OPS</title>
      {error?.status === 404 ? (
        ErrorSwitcher()
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
  const isIframe = request.headers.get("sec-fetch-dest") === "iframe";

  return { language: language, isIframe: isIframe };
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { language } = useTranslation();
  const { color } = useBackgroundColor();

  return (
    <html lang={language} className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
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
  const { language, isIframe } = useRouteLoaderData<typeof loader>("root");
  return (
    <LanguageProvider language={language}>
      <BackgroundColorProvider>
        <SlugProvider>
          {isIframe && (
            <Suspense>
              <LiveVisualEditing />
            </Suspense>
          )}
          <Header />
          <LanguageButton />
          <motion.div
            className="flex flex-col min-h-[100vh]"
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
            <Outlet />
          </motion.div>
          <StickyFooter infoUrl="/info" programUrl="/program" />
        </SlugProvider>
      </BackgroundColorProvider>
    </LanguageProvider>
  );
}
