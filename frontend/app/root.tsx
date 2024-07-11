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
import { getLanguageFromPath, LanguageProvider } from "./utils/i18n";

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

  let backgroundColorClass = "";

  // Determine background color based on route
  switch (pathname) {
    case "/":
      backgroundColorClass = ""; // Example background color for home page
      break;
    case "/info":
      backgroundColorClass = "bg-[#83D2FF]"; // Example background color for about page
      break;
    case "/event":
      backgroundColorClass = "bg-newsletter"; // Example background color for contact page
      break;
    default:
      backgroundColorClass = "bg-gray-100"; // Default background color if route doesn't match
      break;
  }

  return (
    <html lang={language}>
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
  const { language } = useLoaderData<typeof loader>();
  return (
    <LanguageProvider language={language}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow">
          <Outlet />
        </div>
        <StickyFooter infoUrl="/info" programUrl="/event" />
      </div>
    </LanguageProvider>
  );
}
