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
import {
  BackgroundColorProvider,
  useBackgroundColor,
} from "./utils/backgroundColor";
import LanguageButton from "./components/LanguageButton";
import { Suspense, lazy } from "react";

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
const LiveVisualEditing = lazy(() => import("~/components/LiveVisualEditing"));

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
  const ENV = {
    SANITY_STUDIO_PROJECT_ID: import.meta.env.VITE_SANITY_STUDIO_PROJECT_ID,
    SANITY_STUDIO_DATASET: import.meta.env.VITE_SANITY_STUDIO_DATASET,
    SANITY_STUDIO_URL: import.meta.env.VITE_SANITY_STUDIO_URL,
    SANITY_STUDIO_STEGA_ENABLED: import.meta.env.SANITY_STUDIO_STEGA_ENABLED,
  };

  return json({ language, ENV });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { language, ENV } = useRouteLoaderData<typeof loader>("root");
  const { color } = useBackgroundColor();

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
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        {ENV.SANITY_STUDIO_STEGA_ENABLED ? (
          <Suspense>
            <LiveVisualEditing />
          </Suspense>
        ) : null}
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
      <BackgroundColorProvider>
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
