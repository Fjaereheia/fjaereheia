import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  redirect,
  useLocation,
} from "@remix-run/react";
import "./styles/app.css";
import StickyFooter from "./components/StickyFooter";
import Header from "./components/Header/Header";
import { LoaderFunction } from "@remix-run/node";

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
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <StickyFooter infoUrl="/info" programUrl="/event" />
    </div>
  );
}
